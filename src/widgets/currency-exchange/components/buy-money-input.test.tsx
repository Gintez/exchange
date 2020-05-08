import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';
import { Currencies, CURRENCIES } from 'types';

import { BuyMoneyInput } from './buy-money-input';

jest.mock('@material-ui/core/Select', () => ({ onChange, value }: any) => {
  return (
    <select data-qa="currency-select" value={value} onChange={onChange}>
      {CURRENCIES.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
})

describe('<BuyMoneyInput />', () => {
  let wrapper: any;
  const onCurrencyChange = jest.fn();
  const onAmountChange = jest.fn();
  const buyMoney = {
    currency: Currencies.EUR,
    amount: 15,
  };
  const exchangeRate = 1.5;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = renderWithProviders(
      <BuyMoneyInput
        buyMoney={buyMoney}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
        exchangeRate={exchangeRate}
      />
    );
  });

  describe('when buy amount changes', () => {
    it('calls on amount change with new calculated exchange amount', () => {
      const { queryByTestId } = wrapper;

      fireEvent.change(queryByTestId('amount-input'), {
        target: { value: '100.45' },
      });

      expect(onAmountChange).toBeCalledWith({
        buy: 100.45,
        sell: 66.96
      });
    });
  });

  describe('when buy currency changes', () => {
    it('calls on currency change with currency change', () => {
      const { queryByTestId } = wrapper;
      fireEvent.change(queryByTestId('currency-select'), { target: { value: 'USD' } })
  
      expect(onCurrencyChange).toBeCalledWith({ buy: 'USD' });
    });
  })
});
