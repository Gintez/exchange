import { Currencies, ExchangeRates } from 'types';

export default function getExchangeRate({
  sell,
  buy,
  rates,
}: {
  sell: Currencies;
  buy: Currencies;
  rates: ExchangeRates;
}) {
  const baseCurrencyRates = rates && rates[sell];
  return baseCurrencyRates && baseCurrencyRates[buy];
}
