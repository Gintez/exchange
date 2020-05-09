import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

interface OwnProps {
  value: number;
  handleAmountChange: (amount: number) => void;
}

type Props = OwnProps;

export const AmountInput = (props: Props) => {
  const { value, handleAmountChange } = props;

  function handleInputChange(numberFormatValue: NumberFormatValues) {
    value !== numberFormatValue.floatValue &&
      handleAmountChange(numberFormatValue.floatValue);
  }

  return (
    <div>
      <NumberFormat
        onValueChange={handleInputChange}
        value={value}
        customInput={TextField}
        inputProps={{
          'data-qa': 'amount-input',
        }}
        thousandSeparator={true}
        decimalScale={2}
        allowNegative={false}
        variant="outlined"
        placeholder="0"
      />
    </div>
  );
};

export default AmountInput;
