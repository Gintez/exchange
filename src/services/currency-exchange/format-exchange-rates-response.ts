import { ExchangeRateResponse, CURRENCIES } from 'types';

type AvailableRates = { [key in string]: { [key: string]: number } };

function filterAvailable({ base, rates }: ExchangeRateResponse) {
  return CURRENCIES.reduce(
    (acc, currency) =>
      base === currency ? acc : { ...acc, [currency]: rates[currency] },
    {}
  );
}

export default function formatExchangeRatesResponse(
  exchangeRates: Array<ExchangeRateResponse>
) {
  return exchangeRates.reduce(
    (acc: AvailableRates, current: ExchangeRateResponse) => {
      acc[current.base] = filterAvailable(current);
      return acc;
    },
    {}
  );
}
