import { handleActions } from 'redux-actions';

import { Account } from 'types';

export type DefaultState = Account;

export const defaultState: DefaultState = {
  pockets: null,
  primaryCurrency: null,
};

const reducer = handleActions(
  {},
  defaultState
);

export default reducer;
