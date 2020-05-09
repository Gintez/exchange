import React from 'react';

import { renderWithProviders } from 'helpers/test-utils/render';
import { Currencies } from 'types';
import { createBalance } from 'helpers/mocks/account';

import { MoneyInput } from './money-input';

describe('<MoneyInput />', () => {
  let wrapper: any;
  const balance = createBalance();
  const handleAmountChange = jest.fn();
  const amount = 5;
  const currency = Currencies.EUR;
  const handleCurrencyChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when sell amount does not exceed balance', () => {
    beforeEach(() => {
      wrapper = renderWithProviders(
        <MoneyInput
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          amount={amount}
          handleAmountChange={handleAmountChange}
          balance={balance}
        />
      );
    });
  
    it('renders currency select input', () => {
      const { queryByTestId } = wrapper;
      expect(queryByTestId('money-input--currency-select')).toBeInTheDocument();
    })
  
    it('renders amount input', () => {
      const { queryByTestId } = wrapper;
      expect(queryByTestId('money-input--amount-input')).toBeInTheDocument();
    })
  
    it('renders balance', () => {
      const { getByText } = wrapper;
      expect(getByText(`Balance: ${balance.amountFormatted}`)).toBeInTheDocument();
    })
  })

  describe('when balance of sell money is exceeded and showExceededBalance', () => {
    it('should show exceeded balance text', () => {
      const { getByText } = renderWithProviders(
        <MoneyInput
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          amount={5000}
          handleAmountChange={handleAmountChange}
          balance={balance}
          showExceededBalance
        />
      );
      expect(getByText('exceeds balance')).toBeInTheDocument();
    })
  })
});
