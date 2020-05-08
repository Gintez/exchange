import { createAction } from 'redux-actions';

import { ExchangePair, ExchangeAmount, ExchangeRates } from 'types';

import { NAMESPACE } from './constants';

export const setExchangePair = createAction<ExchangePair>(
  `${NAMESPACE}/SET_CURRENCY_EXCHANGE_PAIR`
);
export const setExchangeAmount = createAction<ExchangeAmount>(
  `${NAMESPACE}/SET_EXCHANGE_AMOUNT`
);
export const getExchangeRates = createAction(
  `${NAMESPACE}/GET_EXCHANGE_RATES`
);
export const setExchangeRates = createAction<ExchangeRates>(
  `${NAMESPACE}/GET_EXCHANGE_RATES`
);
