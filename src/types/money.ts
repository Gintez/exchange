export enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

export interface Money {
  currency: Currencies;
  amount: number;
}

export const CURRENCIES = [Currencies.USD, Currencies.EUR, Currencies.GBP];