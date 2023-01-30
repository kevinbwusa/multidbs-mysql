import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CreditCardService } from '../service/credit-card.service';

import { CreditCardComponent } from './credit-card.component';

describe('Component Tests', () => {
  describe('CreditCard Management Component', () => {
    let comp: CreditCardComponent;
    let fixture: ComponentFixture<CreditCardComponent>;
    let service: CreditCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CreditCardComponent],
      })
        .overrideTemplate(CreditCardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CreditCardComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CreditCardService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.creditCards?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
