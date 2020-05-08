import { ExchangeRateResponse } from 'types';

export const createExchangeRates = (val?: any): ExchangeRateResponse => ({
  base: 'EUR',
  date: 'any date',
  rates: {
    CAD: 1.5225,
    HKD: 8.3763,
    ISK: 159.3,
    GBP: 80.7789,
    EUR: 7.569,
    USD: 1.0807,
  },
  ...val,
});

export const createAvailableExchangeRates = () => ({
  EUR: {
    GBP: 80.7789,
    USD: 1.0807,
  },
  USD: {
    GBP: 80.7789,
    EUR: 7.569,
  },
  GBP: {
    EUR: 7.569,
    USD: 1.0807,
  }
})