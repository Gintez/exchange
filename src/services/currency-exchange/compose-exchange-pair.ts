import { ExchangePair } from 'types';

interface ComposeExchangePair {
  currencyChange: Partial<ExchangePair>;
  currentCurrencyPair: ExchangePair;
}

export default function composeExchangePair({
  currencyChange,
  currentCurrencyPair,
}: ComposeExchangePair) {
  let buy = currencyChange.buy;
  let sell = currencyChange.sell;

  if (buy) {
    sell =
      currentCurrencyPair.sell === buy
        ? currentCurrencyPair.buy
        : currentCurrencyPair.sell;
  } else {
    buy =
      currentCurrencyPair.buy === sell
        ? currentCurrencyPair.sell
        : currentCurrencyPair.buy;
  }

  return { buy, sell };
}
