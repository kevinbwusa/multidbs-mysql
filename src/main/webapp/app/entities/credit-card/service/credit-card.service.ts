import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICreditCard, getCreditCardIdentifier } from '../credit-card.model';

export type EntityResponseType = HttpResponse<ICreditCard>;
export type EntityArrayResponseType = HttpResponse<ICreditCard[]>;

@Injectable({ providedIn: 'root' })
export class CreditCardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credit-cards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(creditCard: ICreditCard): Observable<EntityResponseType> {
    return this.http.post<ICreditCard>(this.resourceUrl, creditCard, { observe: 'response' });
  }

  update(creditCard: ICreditCard): Observable<EntityResponseType> {
    return this.http.put<ICreditCard>(`${this.resourceUrl}/${getCreditCardIdentifier(creditCard) as number}`, creditCard, {
      observe: 'response',
    });
  }

  partialUpdate(creditCard: ICreditCard): Observable<EntityResponseType> {
    return this.http.patch<ICreditCard>(`${this.resourceUrl}/${getCreditCardIdentifier(creditCard) as number}`, creditCard, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICreditCard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICreditCard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCreditCardToCollectionIfMissing(
    creditCardCollection: ICreditCard[],
    ...creditCardsToCheck: (ICreditCard | null | undefined)[]
  ): ICreditCard[] {
    const creditCards: ICreditCard[] = creditCardsToCheck.filter(isPresent);
    if (creditCards.length > 0) {
      const creditCardCollectionIdentifiers = creditCardCollection.map(creditCardItem => getCreditCardIdentifier(creditCardItem)!);
      const creditCardsToAdd = creditCards.filter(creditCardItem => {
        const creditCardIdentifier = getCreditCardIdentifier(creditCardItem);
        if (creditCardIdentifier == null || creditCardCollectionIdentifiers.includes(creditCardIdentifier)) {
          return false;
        }
        creditCardCollectionIdentifiers.push(creditCardIdentifier);
        return true;
      });
      return [...creditCardsToAdd, ...creditCardCollection];
    }
    return creditCardCollection;
  }
}
