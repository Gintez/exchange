import React from 'react';

import { Money, Currencies, ExchangeAmount, ExchangeAction, ExchangePair } from 'types';
import { calculateSellAmount} from 'services/currency-exchange/calculate-amount';

import MoneyInput from './money-input';

interface OwnProps {
  exchangeRate: number;
  buyMoney: Money;
  onCurrencyChange: (changeCurrency: Partial<ExchangePair>) => void;
  onAmountChange: (exchangeAmount: ExchangeAmount) => void;
}

type Props = OwnProps;

export const BuyMoneyInput = (props: Props) => {
  const { buyMoney, exchangeRate, onCurrencyChange, onAmountChange } = props;

  function handleBuyCurrencyChange(currency: Currencies) {
    onCurrencyChange({ [ExchangeAction.buy]: currency });
  }

  function handleBuyAmountChange(amount: number) {
    onAmountChange({
      buy: amount,
      sell: calculateSellAmount({ amount, exchangeRate }),
    });
  }

  return (
    <MoneyInput
      currency={buyMoney?.currency}
      handleCurrencyChange={handleBuyCurrencyChange}
      handleAmountChange={handleBuyAmountChange}
      amount={buyMoney?.amount}
    />
  );
};

export default BuyMoneyInput;
