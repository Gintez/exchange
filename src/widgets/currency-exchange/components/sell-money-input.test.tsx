import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';
import { Currencies, CURRENCIES } from 'types';

import { SellMoneyInput } from './sell-money-input';

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

describe('<SellMoneyInput />', () => {
  let wrapper: any;
  const onCurrencyChange = jest.fn();
  const onAmountChange = jest.fn();
  const sellMoney = {
    currency: Currencies.EUR,
    amount: 15,
  };
  const exchangeRate = 1.5;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = renderWithProviders(
      <SellMoneyInput
        sellMoney={sellMoney}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
        exchangeRate={exchangeRate}
      />
    );
  });

  describe('when sell amount changes', () => {
    it('calls on amount change with new calculated exchange amount', () => {
      const { queryByTestId } = wrapper;

      fireEvent.change(queryByTestId('amount-input'), {
        target: { value: '100.5' },
      });

      expect(onAmountChange).toBeCalledWith({
        sell: 100.5,
        buy: 150.75
      });
    });
  });

  describe('when sell currency changes', () => {
    it('calls on currency change with sell currency change', () => {
      const { queryByTestId } = wrapper;
      fireEvent.change(queryByTestId('currency-select'), { target: { value: 'USD' } })
  
      expect(onCurrencyChange).toBeCalledWith({ sell: 'USD' });
    });
  })
});
