import { Currencies, ExchangeRates } from 'types';

interface GetExchangeRate {
  sell: Currencies;
  buy: Currencies;
  rates: ExchangeRates;
}

export default function getExchangeRate({ sell, buy, rates }: GetExchangeRate) {
  return rates?.[sell]?.[buy];
}
