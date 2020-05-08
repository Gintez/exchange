import { ExchangePair } from 'types';

export default function composeExchangePair({
  currencyChange,
  currentCurrencyPair,
}: {
  currencyChange: Partial<ExchangePair>;
  currentCurrencyPair: ExchangePair;
}) {
  let buy = currencyChange.buy;
  let sell = currencyChange.sell;

  if (buy) {
    sell = currentCurrencyPair.sell === buy ? currentCurrencyPair.buy : currentCurrencyPair.sell;
  } else {
    buy = currentCurrencyPair.buy === sell ? currentCurrencyPair.sell : currentCurrencyPair.buy;
  }

  return { buy, sell };
}
