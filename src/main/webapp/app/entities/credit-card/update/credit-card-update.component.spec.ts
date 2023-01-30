jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CreditCardService } from '../service/credit-card.service';
import { ICreditCard, CreditCard } from '../credit-card.model';

import { CreditCardUpdateComponent } from './credit-card-update.component';

describe('Component Tests', () => {
  describe('CreditCard Management Update Component', () => {
    let comp: CreditCardUpdateComponent;
    let fixture: ComponentFixture<CreditCardUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let creditCardService: CreditCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CreditCardUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CreditCardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CreditCardUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      creditCardService = TestBed.inject(CreditCardService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const creditCard: ICreditCard = { id: 456 };

        activatedRoute.data = of({ creditCard });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(creditCard));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CreditCard>>();
        const creditCard = { id: 123 };
        jest.spyOn(creditCardService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ creditCard });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: creditCard }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(creditCardService.update).toHaveBeenCalledWith(creditCard);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CreditCard>>();
        const creditCard = new CreditCard();
        jest.spyOn(creditCardService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ creditCard });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: creditCard }));
        saveSubject.complete();

        // THEN
        expect(creditCardService.create).toHaveBeenCalledWith(creditCard);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CreditCard>>();
        const creditCard = { id: 123 };
        jest.spyOn(creditCardService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ creditCard });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(creditCardService.update).toHaveBeenCalledWith(creditCard);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
