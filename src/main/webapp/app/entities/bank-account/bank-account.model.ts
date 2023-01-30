export interface IBankAccount {
  id?: number;
  type?: string | null;
  number?: string | null;
}

export class BankAccount implements IBankAccount {
  constructor(public id?: number, public type?: string | null, public number?: string | null) {}
}

export function getBankAccountIdentifier(bankAccount: IBankAccount): number | undefined {
  return bankAccount.id;
}
