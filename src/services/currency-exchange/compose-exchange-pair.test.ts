import { Currencies } from 'types';

import composeExchangePair from './compose-exchange-pair';

describe('composeExchangePair', () => {
  describe('when new sell currency matches previous buy currency', () => {
    it('toggles buy and sell currencies', () => {
      const subject = composeExchangePair({
        currentCurrencyPair: { buy: Currencies.EUR, sell: Currencies.GBP },
        currencyChange: { sell: Currencies.GBP },
      });

      expect(subject).toMatchObject({
        buy: Currencies.EUR,
        sell: Currencies.GBP,
      });
    });
  });

  describe('when new sell currency does not match previous buy currency', () => {
    it('return buy currency unchanged', () => {
      const subject = composeExchangePair({
        currentCurrencyPair: { sell: Currencies.EUR, buy: Currencies.USD },
        currencyChange: { sell: Currencies.GBP },
      });

      expect(subject).toMatchObject({
        buy: Currencies.USD,
        sell: Currencies.GBP,
      });
    });
  });
});
