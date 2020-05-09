import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Currencies, Balance } from 'types';

import CurrencySelect from './currency-select';
import AmountInput from './amount-input';
import BalanceText from './balance-text';

interface OwnProps {
  handleCurrencyChange: (currency: Currencies) => void;
  amount: number;
  handleAmountChange: (amount: number) => void;
  currency: Currencies;
  balance: Balance;
  showExceededBalance?: boolean;
}
type Props = OwnProps;

const useStyles = makeStyles((theme) => ({
  currencySelect: {
    marginRight: theme.spacing(1),
    width: 80,
  },
}));

export const MoneyInput = (props: Props) => {
  const {
    currency,
    handleCurrencyChange,
    amount,
    handleAmountChange,
    showExceededBalance,
    balance,
  } = props;

  const classes = useStyles();
  const exceededBalance = showExceededBalance && amount > balance?.amount;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex">
        <div
          data-qa="money-input--currency-select"
          className={classes.currencySelect}
        >
          <CurrencySelect
            selectedCurrency={currency}
            handleSelect={handleCurrencyChange}
          />
          <Box width="80px">
            <BalanceText exceededBalance={exceededBalance} balance={balance} />
          </Box>
        </div>
        <div data-qa="money-input--amount-input">
          <AmountInput value={amount} handleAmountChange={handleAmountChange} />
          {exceededBalance && (
            <Typography variant="caption" color="textSecondary">
              exceeds balance
            </Typography>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default MoneyInput;
