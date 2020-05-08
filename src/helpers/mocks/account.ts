import { Account, Currencies } from 'types';

export const createAccount = (): Account => ({
  pockets: [
    {
      currency: Currencies.GBP,
      amount: 5,
    },
    {
      currency: Currencies.EUR,
      amount: 50,
    },
    {
      currency: Currencies.USD,
      amount: 80,
    }
  ],
  primaryCurrency: Currencies.EUR,
})