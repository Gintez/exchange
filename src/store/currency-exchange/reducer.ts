import { handleActions } from 'redux-actions';

import { Money, ExchangeRates } from 'types';

import * as actions from './actions';

export interface DefaultState {
  sell: Money;
  buy: Money;
  exchangeRates: ExchangeRates;
}

export const defaultState: DefaultState = {
  exchangeRates: {
    USD: null,
    EUR: null,
    GBP: null,
  },
  sell: {
    currency: null,
    amount: null,
  },
  buy: {
    currency: null,
    amount: null,
  }
};

const reducer = handleActions<DefaultState, any>(
  {
    [actions.setExchangePair.toString()]: (state, { payload }) => ({
      ...state,
      sell: {
        ...state.sell,
        currency: payload.sell,
      },
      buy: {
        ...state.buy,
        currency: payload.buy,
      }
    }),
    [actions.setExchangeAmount.toString()]: (state, { payload }) => ({
      ...state,
      sell: {
        ...state.sell,
        amount: payload.sell,
      },
      buy: {
        ...state.buy,
        amount: payload.buy,
      }
    }),
    [actions.setExchangeRates.toString()]: (state, { payload }) => ({
      ...state,
      exchangeRates: {
        ...state.exchangeRates,
        ...payload
      },
    }),
  },
  defaultState
);

export default reducer;
