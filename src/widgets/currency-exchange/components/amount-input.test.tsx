import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils/render';

import { AmountInput } from './amount-input';

describe('<AmountInput />', () => {
  let wrapper: any;
  const handleAmountChange = jest.fn();
  const value = 5;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = renderWithProviders(
      <AmountInput handleAmountChange={handleAmountChange} value={value} />
    );
  })

  describe('when input change is made', () => {
    it('calls handle amount with a new amount value', () => {
      const { queryByTestId } = wrapper;

      fireEvent.change(queryByTestId('amount-input'), { target: { value: '100.5' } })
  
      expect(handleAmountChange).toBeCalledWith(100.5);
    });

    it('does not calls handle amount if new amount is same as previous', () => {
      const { queryByTestId } = wrapper;

      fireEvent.change(queryByTestId('amount-input'), { target: { value } })
  
      expect(handleAmountChange).not.toBeCalled();
    });
  })
})
