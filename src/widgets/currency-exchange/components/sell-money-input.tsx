import React from 'react';

import { Money, Currencies, ExchangeAmount, ExchangeAction, ExchangePair } from 'types';
import { calculateBuyAmount } from 'services/currency-exchange/calculate-amount';

import MoneyInput from './money-input';

interface OwnProps {
  exchangeRate: number;
  sellMoney: Money;
  onCurrencyChange: (changeCurrency: Partial<ExchangePair>) => void;
  onAmountChange: (exchangeAmount: ExchangeAmount) => void;
}

type Props = OwnProps;

export const SellMoneyInput = (props: Props) => {
  const { sellMoney, exchangeRate, onCurrencyChange, onAmountChange } = props;

  function handleCurrencyChange(currency: Currencies) {
    onCurrencyChange({ [ExchangeAction.sell]: currency });
  }

  function handleAmountChange(amount: number) {
    onAmountChange({
      sell: amount,
      buy: calculateBuyAmount({ amount, exchangeRate }),
    });
  }

  return (
    <MoneyInput
      currency={sellMoney?.currency}
      handleCurrencyChange={handleCurrencyChange}
      handleAmountChange={handleAmountChange}
      amount={sellMoney?.amount}
    />
  );
};

export default SellMoneyInput;
