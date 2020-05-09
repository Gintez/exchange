import { ExchangeAmount } from 'types';

import { calculateBuyAmount } from 'services/currency-exchange';

interface RecalculateExchangeAmount {
  exchangeRate: number;
  exchangeAmount: ExchangeAmount;
}

export default function recalculateExchangeAmount({
  exchangeRate,
  exchangeAmount,
}: RecalculateExchangeAmount) {
  const sell = exchangeAmount?.sell;

  return { buy: calculateBuyAmount({ exchangeRate, amount: sell }), sell };
}
