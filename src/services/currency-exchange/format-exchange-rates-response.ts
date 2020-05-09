import { ExchangeRateResponse, CURRENCIES, ExchangeRates } from 'types';

function filterAvailable({ base, rates }: ExchangeRateResponse) {
  return CURRENCIES.reduce(
    (acc, currency) =>
      base === currency ? acc : { ...acc, [currency]: rates[currency] },
    {}
  );
}

export default function formatExchangeRatesResponse(
  exchangeRates: Array<ExchangeRateResponse>
): ExchangeRates {
  return exchangeRates.reduce(
    (acc: ExchangeRates, current: ExchangeRateResponse) => {
      acc[current.base] = filterAvailable(current);
      return acc;
    },
    {}
  );
}
