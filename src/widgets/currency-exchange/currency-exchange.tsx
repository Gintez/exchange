import React, { useEffect } from 'react';
import { Paper, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

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

import SellMoneyInput from './components/sell-money-input';
import BuyMoneyInput from './components/buy-money-input';

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
  const exchangePair = account && getInitialExchangePair(account);

  useEffect(() => {
    actions.currencyExchange.getExchangeRates();
    setInitialExchangePair();

    // TODO: clean state
  }, []);

  function setInitialExchangePair() {
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

  return (
    <Paper>
      <Box padding={2}>
        <SellMoneyInput
          exchangeRate={exchangeRate}
          sellMoney={sellMoney}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <BuyMoneyInput
          exchangeRate={exchangeRate}
          buyMoney={buyMoney}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </Box>
    </Paper>
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
