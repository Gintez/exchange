import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';
import * as currencyExchangeActions from 'store/currency-exchange/actions';
import { createAccount } from 'helpers/mocks/account';
import { createAvailableExchangeRates } from 'helpers/mocks/exchange-rates';
import { Currencies, CURRENCIES } from 'types';

import { CurrencyExchange } from './currency-exchange';

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


describe('<CurrencyExchange />', () => {
  let wrapper: any;
  const getExchangeRates = jest.fn();
  const setExchangePair = jest.fn();
  const setExchangeAmount = jest.fn();
  const actions = {
    currencyExchange: {
      ...currencyExchangeActions,
      getExchangeRates,
      setExchangePair,
      setExchangeAmount,
    },
  };
  const account = createAccount();
  const exchangeRates = createAvailableExchangeRates();
  const sellMoney = {
    currency: Currencies.EUR,
    amount: 1,
  };
  const buyMoney = {
    currency: Currencies.USD,
    amount: 1.2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = renderWithProviders(
      <CurrencyExchange
        actions={actions}
        account={account}
        exchangeRates={exchangeRates}
        sellMoney={sellMoney}
        buyMoney={buyMoney}
      />
    );
  });

  describe('on initial load', () => {
    it('calls for exchange rates', () => {
      expect(getExchangeRates).toBeCalled();
    });

    it('sets initial exchange pair', () => {
      expect(setExchangePair).toBeCalledWith({ sell: 'EUR', buy: 'GBP' });
    });
  });

  describe('on sell currency change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('currency-select')[0], { target: { value: 'USD' } })
    })

    it('sets correct new exchange pair', () => {
      expect(setExchangePair.mock.calls[1][0]).toMatchObject({ buy: 'EUR', sell: 'USD'});
    });

    it('sets recalculated exchange amount', () => {
      expect(setExchangeAmount).toBeCalledWith({ buy: 7.56, sell: 1 });
    });
  })

  describe('on buy currency change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('currency-select')[1], { target: { value: 'USD' } })
    })

    it('sets correct new exchange pair', () => {
      expect(setExchangePair.mock.calls[1][0]).toMatchObject({ sell: 'EUR', buy: 'USD'});
    });

    it('sets recalculated exchange amount', () => {
      expect(setExchangeAmount).toBeCalledWith({ buy: 1.08, sell: 1 });
    });
  })

  describe('on sell amount change', () => {
    it('sets correct new exchange amount', () => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('amount-input')[0], { target: { value: '100.5' } })

      expect(setExchangeAmount).toBeCalledWith({ sell: 100.5, buy: expect.any(Number) });
    });
  })

  describe('on buy amount change', () => {
    it('sets correct new exchange amount', () => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('amount-input')[1], { target: { value: '100.5' } })

      expect(setExchangeAmount).toBeCalledWith({ buy: 100.5, sell: expect.any(Number) });
    });
  })
});
