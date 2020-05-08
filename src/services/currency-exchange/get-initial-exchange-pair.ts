import { ExchangePair, Account } from 'types';

export default function (account: Account): ExchangePair {
  const primaryCurrency = account.primaryCurrency;
  const secondaryCurrency = account.pockets.find(
    ({ currency }) => currency !== primaryCurrency
  ).currency;

  return { sell: primaryCurrency, buy: secondaryCurrency };
}
