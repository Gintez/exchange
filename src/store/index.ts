
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { Currencies } from 'types';

import createRootReducer from './root-reducer';
import sagas from './root-saga';

const initialState = { // Assuming that the account will have some initial balance;
  account: {
    pockets: [
      {
        currency: Currencies.EUR,
        amount: 100,
      },
      {
        currency: Currencies.GBP,
        amount: 10
      },
      {
        currency: Currencies.USD,
        amount: 200
      }
    ],
    primaryCurrency: Currencies.EUR
  }
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [ sagaMiddleware ];

  const store = createStore(
    createRootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return store;
};

const store = configureStore();

export type State = ReturnType<typeof store.getState>;
export default store;
