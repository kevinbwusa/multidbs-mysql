import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CreditCardDetailComponent } from './credit-card-detail.component';

describe('Component Tests', () => {
  describe('CreditCard Management Detail Component', () => {
    let comp: CreditCardDetailComponent;
    let fixture: ComponentFixture<CreditCardDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CreditCardDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ creditCard: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CreditCardDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CreditCardDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load creditCard on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.creditCard).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
