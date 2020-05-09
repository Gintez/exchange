import React, { useEffect } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { makeStyles, Theme } from '@material-ui/core/styles';

import * as currencyExchangeActions from 'store/currency-exchange/actions';
import {
  Account,
  ExchangeRates,
  Money,
  ExchangeAmount,
  ExchangePair,
} from 'types';
import { getAccount } from 'store/account/selectors';
import { State } from 'store';
import {
  getMoneyToBuy,
  getMoneyToSell,
  getExchangeRates,
} from 'store/currency-exchange/selectors';
import {
  composeExchangePair,
  getExchangeRate,
  getInitialExchangePair,
  recalculateExchangeAmount,
} from 'services/currency-exchange';
import { getBalanceFor } from 'services/account';

import SellMoneyInput from './components/sell-money-input';
import BuyMoneyInput from './components/buy-money-input';
import ExchangeSubmit from './components/exchange-submit';

interface StateProps {
  account: Account;
  exchangeRates: ExchangeRates;
  sellMoney: Money;
  buyMoney: Money;
}

interface DispatchProps {
  actions: {
    currencyExchange: typeof currencyExchangeActions;
  };
}

type Props = DispatchProps & StateProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 600,
  },
  content: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  exchangeInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  sellInput: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
}));

export const CurrencyExchange = (props: Props) => {
  const { actions, account, exchangeRates, buyMoney, sellMoney } = props;

  const currentCurrencyPair = {
    sell: sellMoney?.currency,
    buy: buyMoney?.currency,
  };
  const exchangeRate = getExchangeRate({
    ...currentCurrencyPair,
    rates: exchangeRates,
  });
  const exchangeAmount = { buy: buyMoney?.amount, sell: sellMoney?.amount };
  const getBalance = getBalanceFor.bind(null, account);
  const classes = useStyles();

  useEffect(() => {
    actions.currencyExchange.startExchangeRatesPolling();
    setInitialExchangePair();

    return () => {
      actions.currencyExchange.clearState();
      actions.currencyExchange.stopExchangeRatesPolling();
    };
  }, []);

  function setInitialExchangePair() {
    const exchangePair = account && getInitialExchangePair(account);
    exchangePair && actions.currencyExchange.setExchangePair(exchangePair);
  }

  function handleCurrencyChange(currencyChange: Partial<ExchangePair>) {
    const newPair = composeExchangePair({
      currencyChange,
      currentCurrencyPair,
    });

    actions.currencyExchange.setExchangePair(newPair);
    recalculateAmount(newPair);
  }

  function recalculateAmount(exchangePair: ExchangePair) {
    const newExchangeRate = getExchangeRate({
      ...exchangePair,
      rates: exchangeRates,
    });

    const recalculatedExchangeAmount = recalculateExchangeAmount({
      exchangeAmount,
      exchangeRate: newExchangeRate,
    });

    handleAmountChange(recalculatedExchangeAmount);
  }

  function handleAmountChange(exchangeAmount: ExchangeAmount) {
    actions.currencyExchange.setExchangeAmount(exchangeAmount);
  }

  function handleExchangeSubmit(values: { buyMoney: Money; sellMoney: Money }) {
    // Call submit with buyMoney and sellMoney to update account balance
  }

  return (
    <div className={classes.root}>
      <Paper>
        <div className={classes.content}>
          <Box mb={4}>
            <Typography>Exchange</Typography>
          </Box>
          <div className={classes.exchangeInputs}>
            <div className={classes.sellInput}>
              <SellMoneyInput
                exchangeRate={exchangeRate}
                sellMoney={sellMoney}
                onCurrencyChange={handleCurrencyChange}
                onAmountChange={handleAmountChange}
                balance={getBalance(sellMoney?.currency)}
              />
            </div>
            <BuyMoneyInput
              exchangeRate={exchangeRate}
              buyMoney={buyMoney}
              onCurrencyChange={handleCurrencyChange}
              onAmountChange={handleAmountChange}
              balance={getBalance(buyMoney?.currency)}
            />
          </div>
          <Box mt={2}>
            <ExchangeSubmit
              onSubmit={handleExchangeSubmit}
              sellMoney={sellMoney}
              buyMoney={buyMoney}
            />
          </Box>
        </div>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    currencyExchange: bindActionCreators(currencyExchangeActions, dispatch),
  },
});

const mapStateToProps = (state: State): StateProps => ({
  account: getAccount(state),
  exchangeRates: getExchangeRates(state),
  buyMoney: getMoneyToBuy(state),
  sellMoney: getMoneyToSell(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyExchange);
