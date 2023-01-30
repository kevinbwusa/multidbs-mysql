jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICreditCard, CreditCard } from '../credit-card.model';
import { CreditCardService } from '../service/credit-card.service';

import { CreditCardRoutingResolveService } from './credit-card-routing-resolve.service';

describe('CreditCard routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CreditCardRoutingResolveService;
  let service: CreditCardService;
  let resultCreditCard: ICreditCard | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(CreditCardRoutingResolveService);
    service = TestBed.inject(CreditCardService);
    resultCreditCard = undefined;
  });

  describe('resolve', () => {
    it('should return ICreditCard returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCreditCard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCreditCard).toEqual({ id: 123 });
    });

    it('should return new ICreditCard if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCreditCard = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCreditCard).toEqual(new CreditCard());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CreditCard })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCreditCard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCreditCard).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
