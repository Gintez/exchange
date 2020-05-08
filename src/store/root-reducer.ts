import { combineReducers } from 'redux';

import { NAMESPACE as account } from './account/constants';
import accountReducer from './account/reducer';
import { NAMESPACE as currencyExchange } from './currency-exchange/constants';
import currencyExchangeReducer from './currency-exchange/reducer';

export default combineReducers({
  [account]: accountReducer,
  [currencyExchange]: currencyExchangeReducer,
});
