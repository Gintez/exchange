import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';
import { Currencies } from 'types';

import { ExchangeSubmit } from './exchange-submit';

describe('<ExchangeSubmit />', () => {
  const onSubmit = jest.fn();
  const buyMoney = {
    currency: Currencies.EUR,
    amount: 15,
  };
  const sellMoney = {
    currency: Currencies.GBP,
    amount: 15,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  })

  describe('when there is no sell amount', () => {
    let wrapper: any;
    const sellMoney = {
      currency: Currencies.GBP,
      amount: null as number,
    };

    beforeEach(() => {
      wrapper = renderWithProviders(
        <ExchangeSubmit
          buyMoney={buyMoney}
          onSubmit={onSubmit}
          sellMoney={sellMoney}
        />
      );

    })

    it('button is disabled', () => {
      const { queryByTestId } = wrapper;

      expect(queryByTestId('submit-exchange-btn')).toBeDisabled();
    })

    it('does not call on submit on click', () => {
      const { queryByTestId } = wrapper;
      fireEvent.click(queryByTestId('submit-exchange-btn'));
      expect(onSubmit).not.toBeCalled();
    })
  })

  describe('when there is no buy amount', () => {
    let wrapper: any;
    const buyMoney = {
      currency: Currencies.EUR,
      amount: null as number,
    };

    beforeEach(() => {
      wrapper = renderWithProviders(
        <ExchangeSubmit
          buyMoney={buyMoney}
          onSubmit={onSubmit}
          sellMoney={sellMoney}
        />
      );
    })

    it('button is disabled', () => {
      const { queryByTestId } = wrapper;
      expect(queryByTestId('submit-exchange-btn')).toBeDisabled();
    })

    it('does not call on submit on click', () => {
      const { queryByTestId } = wrapper;
      fireEvent.click(queryByTestId('submit-exchange-btn'));
      expect(onSubmit).not.toBeCalled();
    })
  })

  describe('when there is buy and sell amount money', () => {
    it('on click calls onSubmit with sell and buy', () => {

      const { queryByTestId } = renderWithProviders(
        <ExchangeSubmit
          buyMoney={buyMoney}
          onSubmit={onSubmit}
          sellMoney={sellMoney}
        />
      );

      fireEvent.click(queryByTestId('submit-exchange-btn'));
      expect(onSubmit).toBeCalledWith({ buyMoney, sellMoney });
    })
  })
});
