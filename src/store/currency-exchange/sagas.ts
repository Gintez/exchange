import { all, take, call, put, race, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as exchangeRatesApi from 'api/exchange-rates';
import { Currencies } from 'types';
import formatExchangeRatesResponse from 'services/currency-exchange/format-exchange-rates-response';

import * as actions from './actions';

function* getExchangeRate() {
  while (true) {
    try {
      const exchangeRates = yield all([
        yield call(exchangeRatesApi.getExchangeRates, Currencies.EUR),
        yield call(exchangeRatesApi.getExchangeRates, Currencies.USD),
        yield call(exchangeRatesApi.getExchangeRates, Currencies.GBP),
      ]);

      const availableExchangeRates = formatExchangeRatesResponse(
        exchangeRates.map((response: AxiosResponse) => response.data)
      )

      yield put(actions.setExchangeRates(availableExchangeRates));
      yield delay(10000);
    } catch {}
  }
}

function* getExchangeRateFlow() {
  while (true) {
    yield take(actions.startExchangeRatesPolling);

    yield call(getExchangeRate);
    yield race([call(getExchangeRate), take(actions.stopExchangeRatesPolling)] )
  }
}

export default function* sagas() {
  yield all([getExchangeRateFlow()]);
}
