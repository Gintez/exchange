import { State } from 'store';

import { NAMESPACE } from './constants';

export const getMoneyToSell = (state: State) => state?.[NAMESPACE]?.sell;
export const getMoneyToBuy = (state: State) => state?.[NAMESPACE]?.buy;
export const getExchangeRates = (state: State) => state?.[NAMESPACE]?.exchangeRates;
