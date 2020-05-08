import { Currencies } from 'types';

export enum ExchangeAction {
  sell = 'sell',
  buy = 'buy',
}

export interface ExchangePair {
  [ExchangeAction.sell]: Currencies;
  [ExchangeAction.buy]: Currencies;
}

export interface ExchangeAmount {
  [ExchangeAction.sell]: number;
  [ExchangeAction.buy]: number;
}

export type ExchangeRates = {
  [currency in Currencies]: {
    [key: string]: number;
  };
}

export interface ExchangeRateResponse {
  rates: {
    [key: string]: number;
  };
  base: Currencies;
  date: string;
}

