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
});

describe('<CurrencyExchange />', () => {
  let wrapper: any;
  const actions = {
    currencyExchange: {
      ...currencyExchangeActions,
      startExchangeRatesPolling: jest.fn(),
      stopExchangeRatesPolling: jest.fn(),
      setExchangePair: jest.fn(),
      setExchangeAmount: jest.fn(),
      clearState: jest.fn(),
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
    it('gets exchange rates', () => {
      const subject = actions.currencyExchange.startExchangeRatesPolling;

      expect(subject).toBeCalled();
    });

    it('sets initial exchange pair', () => {
      const subject = actions.currencyExchange.setExchangePair;

      expect(subject).toBeCalledWith({
        sell: 'EUR',
        buy: 'GBP',
      });
    });
  });

  describe('on sell currency change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('currency-select')[0], {
        target: { value: 'USD' },
      });
    });

    it('sets new correct exchange pair', () => {
      const subject = actions.currencyExchange.setExchangePair.mock.calls[1][0];

      expect(subject).toMatchObject({ buy: 'EUR', sell: 'USD' });
    });

    it('sets recalculated exchange amount', () => {
      const subject = actions.currencyExchange.setExchangeAmount;

      expect(subject).toBeCalledWith({
        buy: 7.56,
        sell: 1,
      });
    });
  });

  describe('on buy currency change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('currency-select')[1], {
        target: { value: 'USD' },
      });
    });

    it('sets correct new exchange pair', () => {
      const subject = actions.currencyExchange.setExchangePair.mock.calls[1][0];

      expect(subject).toMatchObject({ sell: 'EUR', buy: 'USD' });
    });

    it('sets recalculated exchange amount', () => {
      const subject = actions.currencyExchange.setExchangeAmount;

      expect(subject).toBeCalledWith({
        buy: 1.08,
        sell: 1,
      });
    });
  });

  describe('on sell amount change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;
      fireEvent.change(queryAllByTestId('amount-input')[0], {
        target: { value: '100.5' },
      });
    });

    it('sets correct new exchange amount', () => {
      const subject = actions.currencyExchange.setExchangeAmount;

      expect(subject).toBeCalledWith({
        sell: 100.5,
        buy: expect.any(Number),
      });
    });
  });

  describe('on buy amount change', () => {
    beforeEach(() => {
      const { queryAllByTestId } = wrapper;

      fireEvent.change(queryAllByTestId('amount-input')[1], {
        target: { value: '100.5' },
      });
    });

    it('sets correct new exchange amount', () => {
      const subject = actions.currencyExchange.setExchangeAmount;

      expect(subject).toBeCalledWith({
        buy: 100.5,
        sell: expect.any(Number),
      });
    });
  });

  describe('unmounting currency exchange', () => {
    beforeEach(() => {
      wrapper.unmount();
    });

    it('resets exchange rates state', () => {
      const subject = actions.currencyExchange.clearState;

      expect(subject).toBeCalledTimes(1);
    });

    it('stops exchange rate polling', () => {
      const subject = actions.currencyExchange.stopExchangeRatesPolling;

      expect(subject).toBeCalledTimes(1);
    });
  });
});
