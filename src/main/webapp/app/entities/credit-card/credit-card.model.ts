export interface ICreditCard {
  id?: number;
  type?: string | null;
  number?: string | null;
}

export class CreditCard implements ICreditCard {
  constructor(public id?: number, public type?: string | null, public number?: string | null) {}
}

export function getCreditCardIdentifier(creditCard: ICreditCard): number | undefined {
  return creditCard.id;
}
