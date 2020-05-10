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

  it('shows currency select input', () => {
    const { queryByTestId } = wrapper;
    const subject = queryByTestId('money-input--currency-select');

    expect(subject).toBeInTheDocument();
  })

  it('shows amount input', () => {
    const { queryByTestId } = wrapper;
    const subject = queryByTestId('money-input--amount-input');

    expect(subject).toBeInTheDocument();
  })

  it('shows balance', () => {
    const { getByText } = wrapper;
    const subject = getByText(`Balance: ${balance.amountFormatted}`);

    expect(subject).toBeInTheDocument();
  })

  describe('when balance of sell money is exceeded and should inform about it', () => {
    it('shows exceeded balance text', () => {
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
      const subject = getByText('exceeds balance');

      expect(subject).toBeInTheDocument();
    })
  })
});
