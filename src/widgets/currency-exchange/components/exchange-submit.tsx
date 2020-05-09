import React from 'react';
import { Button } from '@material-ui/core';

import { Money } from 'types';

interface OwnProps {
  sellMoney: Money;
  buyMoney: Money;
  onSubmit: ({
    buyMoney,
    sellMoney,
  }: {
    buyMoney: Money;
    sellMoney: Money;
  }) => void;
}

type Props = OwnProps;

export const ExchangeSubmit = (props: Props) => {
  const { buyMoney, sellMoney, onSubmit } = props;

  function handleExchangeSubmit() {
    onSubmit({ buyMoney, sellMoney });
  }

  const isDisabled = !buyMoney?.amount || !sellMoney?.amount;

  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      color="primary"
      onClick={handleExchangeSubmit}
      data-qa='submit-exchange-btn'
    >
      Exchange
    </Button>
  );
};

export default ExchangeSubmit;
