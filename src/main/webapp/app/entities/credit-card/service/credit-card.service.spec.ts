import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICreditCard, CreditCard } from '../credit-card.model';

import { CreditCardService } from './credit-card.service';

describe('CreditCard Service', () => {
  let service: CreditCardService;
  let httpMock: HttpTestingController;
  let elemDefault: ICreditCard;
  let expectedResult: ICreditCard | ICreditCard[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CreditCardService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      type: 'AAAAAAA',
      number: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a CreditCard', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CreditCard()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CreditCard', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          type: 'BBBBBB',
          number: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CreditCard', () => {
      const patchObject = Object.assign({}, new CreditCard());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CreditCard', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          type: 'BBBBBB',
          number: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a CreditCard', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCreditCardToCollectionIfMissing', () => {
      it('should add a CreditCard to an empty array', () => {
        const creditCard: ICreditCard = { id: 123 };
        expectedResult = service.addCreditCardToCollectionIfMissing([], creditCard);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCard);
      });

      it('should not add a CreditCard to an array that contains it', () => {
        const creditCard: ICreditCard = { id: 123 };
        const creditCardCollection: ICreditCard[] = [
          {
            ...creditCard,
          },
          { id: 456 },
        ];
        expectedResult = service.addCreditCardToCollectionIfMissing(creditCardCollection, creditCard);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CreditCard to an array that doesn't contain it", () => {
        const creditCard: ICreditCard = { id: 123 };
        const creditCardCollection: ICreditCard[] = [{ id: 456 }];
        expectedResult = service.addCreditCardToCollectionIfMissing(creditCardCollection, creditCard);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCard);
      });

      it('should add only unique CreditCard to an array', () => {
        const creditCardArray: ICreditCard[] = [{ id: 123 }, { id: 456 }, { id: 83441 }];
        const creditCardCollection: ICreditCard[] = [{ id: 123 }];
        expectedResult = service.addCreditCardToCollectionIfMissing(creditCardCollection, ...creditCardArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const creditCard: ICreditCard = { id: 123 };
        const creditCard2: ICreditCard = { id: 456 };
        expectedResult = service.addCreditCardToCollectionIfMissing([], creditCard, creditCard2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(creditCard);
        expect(expectedResult).toContain(creditCard2);
      });

      it('should accept null and undefined values', () => {
        const creditCard: ICreditCard = { id: 123 };
        expectedResult = service.addCreditCardToCollectionIfMissing([], null, creditCard, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(creditCard);
      });

      it('should return initial array if no CreditCard is added', () => {
        const creditCardCollection: ICreditCard[] = [{ id: 123 }];
        expectedResult = service.addCreditCardToCollectionIfMissing(creditCardCollection, undefined, null);
        expect(expectedResult).toEqual(creditCardCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
