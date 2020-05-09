import { Currencies } from 'types';

import { createAvailableExchangeRates } from 'helpers/mocks/exchange-rates';

import getExchangeRate from './get-exchange-rate';

describe('getExchangeRate', () => {
  describe('when no rates are provided', () => {
    it('returns undefined', () => {
      const subject = getExchangeRate({
        buy: Currencies.EUR,
        sell: Currencies.GBP,
        rates: null,
      });

      expect(subject).toBe(undefined);
    });
  });

  describe('when exchange rates are provided', () => {
    it('returns correct exchange value', () => {
      const rates = createAvailableExchangeRates();
      const subject = getExchangeRate({
        buy: Currencies.EUR,
        sell: Currencies.GBP,
        rates,
      });

      expect(subject).toBe(7.569);
    })
  })
});
