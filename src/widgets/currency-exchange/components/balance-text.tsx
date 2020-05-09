import React from 'react';
import { Typography } from '@material-ui/core';

import { Balance } from 'types';

interface OwnProps {
  balance: Balance;
  exceededBalance?: boolean;
}

type Props = OwnProps;

export const BalanceText = (props: Props) => {
  const {
    exceededBalance,
    balance,
  } = props;

  return (
    <Typography
      variant="caption"
      color={exceededBalance ? 'secondary' : 'textSecondary'}
    >
      {`Balance: ${balance?.amountFormatted || ''}`}
    </Typography>
  );
};

export default BalanceText;
