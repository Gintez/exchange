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
  let sellMoney = {
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
          balance={{}}
        />
      );

    })

    it('submit button is disabled', () => {
      const { queryByTestId } = wrapper;
      const subject = queryByTestId('submit-exchange-btn');

      expect(subject).toBeDisabled();
    })

    describe('on click', () => {
      it('does not submit', () => {
        const { queryByTestId } = wrapper;
        fireEvent.click(queryByTestId('submit-exchange-btn'));
  
        expect(onSubmit).not.toBeCalled();
      })
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
          balance={{}}
        />
      );
    })

    it('button is disabled', () => {
      const { queryByTestId } = wrapper;
      const subject = queryByTestId('submit-exchange-btn');

      expect(subject).toBeDisabled();
    })

    describe('on click', () => {
      it('does not submit', () => {
        const { queryByTestId } = wrapper;
        fireEvent.click(queryByTestId('submit-exchange-btn'));

        expect(onSubmit).not.toBeCalled();
      })
    })
  })

  describe('when there are buy and sell money', () => {
    let wrapper: any;
    const balance = {
      amount: 15,
      formattedAmount: '£15.00',
    };

    beforeEach(() => {
      wrapper = renderWithProviders(
        <ExchangeSubmit
          buyMoney={buyMoney}
          onSubmit={onSubmit}
          sellMoney={sellMoney}
          balance={balance}
        />
      );
    })

    describe('on click', () => {
      it('submits sell and buy values', () => {
        const { queryByTestId } = wrapper;
        fireEvent.click(queryByTestId('submit-exchange-btn'));

        expect(onSubmit).toBeCalledWith({ buyMoney, sellMoney });
      })
    })
  })


  describe('when balance is exceeded', () => {
    let wrapper: any;
    const balance = {
      amount: 15,
      formattedAmount: '£15.00',
    };
    const sellMoney = {
      currency: Currencies.GBP,
      amount: 15000,
    };

    beforeEach(() => {
      wrapper = renderWithProviders(
        <ExchangeSubmit
          buyMoney={buyMoney}
          onSubmit={onSubmit}
          sellMoney={sellMoney}
          balance={balance}
        />
      );
    })

    it('button is disabled', () => {
      const { queryByTestId } = wrapper;
      const subject = queryByTestId('submit-exchange-btn');

      expect(subject).toBeDisabled();
    })
  })
});
