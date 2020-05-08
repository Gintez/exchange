import { Currencies } from 'types';

export interface AccountPocket {
  currency: Currencies;
  amount: number;
}

export type AccountPockets = Array<AccountPocket>

export interface Account {
  pockets: AccountPockets;
  primaryCurrency: Currencies;
}