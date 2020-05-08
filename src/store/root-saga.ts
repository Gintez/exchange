import { all } from 'redux-saga/effects';

import currencyExchangeSaga from './currency-exchange/sagas';

export default function* rootSaga() {
  yield all([currencyExchangeSaga()]);
}
