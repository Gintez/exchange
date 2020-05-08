import React from 'react';

import { Currencies } from 'types';

import CurrencySelect from './currency-select';
import AmountInput from './amount-input';

interface OwnProps {
  handleCurrencyChange: (currency: Currencies) => void;
  amount: number;
  handleAmountChange: (amount: number) => void;
  currency: Currencies;
}
type Props = OwnProps;

const MoneyInput = (props: Props) => {
  const { currency, handleCurrencyChange, amount, handleAmountChange } = props;

  return (
    <>
      <CurrencySelect
        selectedCurrency={currency}
        handleSelect={handleCurrencyChange}
      />
      <AmountInput value={amount} handleAmountChange={handleAmountChange} />
    </>
  );
};

export default MoneyInput;
