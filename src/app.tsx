import React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import store from 'store';
import CurrencyExchangeWidget from 'widgets/currency-exchange';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const App = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <StylesProvider>
        <CssBaseline />
        <div className={classes.root}>
          <CurrencyExchangeWidget />
        </div>
      </StylesProvider>
    </Provider>
  );
}

export default App;
