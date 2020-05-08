import React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import store from 'store';
import CurrencyExchangeWidget from 'widgets/currency-exchange';

export const App = () => (
  <Provider store={store}>
    <StylesProvider>
      <CssBaseline />
      <CurrencyExchangeWidget />
    </StylesProvider>
  </Provider>
);

export default App;
