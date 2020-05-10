import { Currencies, Account } from 'types';

export default function getBalance(account: Account, currency: Currencies) {
  if (!account || !currency) return {};

  const pocket = account.pockets.find(
    (pocket) => pocket.currency === currency
  );

  if (!pocket) return {};

  const amount = pocket.amount;
  const amountFormatted = amount && new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

  return { amount, amountFormatted };
}
