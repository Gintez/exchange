import { Account, Currencies } from 'types';

export const createAccount = (val: any = {}): Account => ({
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
  ...val,
})

export const createBalance = () => ({
  amountFormatted: '£10.00',
  amount: 100,
})
