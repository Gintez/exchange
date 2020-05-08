import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';
import { Currencies, CURRENCIES } from 'types';

import { CurrencySelect } from './currency-select';

jest.mock('@material-ui/core/Select', () => ({ onChange, value }: any) => {
  return (
    <select data-qa="currency-select" value={value} onChange={onChange}>
      {CURRENCIES.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
})

describe('<CurrencySelect />', () => {
  let wrapper: any;
  const handleSelect = jest.fn();
  const selectedCurrency = Currencies.GBP;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = renderWithProviders(
      <CurrencySelect handleSelect={handleSelect} selectedCurrency={selectedCurrency} />
    );
  })

  describe('when new currency is selected', () => {
    it('calls handle select with new currency value', () => {
      const { queryByTestId } = wrapper;
      fireEvent.change(queryByTestId('currency-select'), { target: { value: Currencies.USD } })
  
      expect(handleSelect).toBeCalledWith(Currencies.USD);
    });
  })
})
