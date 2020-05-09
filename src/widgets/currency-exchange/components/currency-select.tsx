import React from 'react';
import { MenuItem, SelectProps } from '@material-ui/core';
import Select from '@material-ui/core/Select';

import { CURRENCIES, Currencies } from 'types';

interface OwnProps {
  handleSelect?: (currency: Currencies) => void;
  selectedCurrency: Currencies;
}

type Props = OwnProps & SelectProps;

export const CurrencySelect = (props: Props) => {
  const { handleSelect, selectedCurrency, ...selectProps } = props;

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const currency = event.target.value;
    handleSelect && handleSelect(currency as Currencies);
  }

  return (
    <Select
      onChange={handleChange}
      value={selectedCurrency || ''}
      variant="outlined"
      {...selectProps}
    >
      {CURRENCIES.map(currency => (
        <MenuItem key={currency} value={currency}>
          {currency}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelect;
