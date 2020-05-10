import { Currencies } from 'types';
import { createAccount } from 'helpers/mocks/account';

import getBalance from './get-balance';

describe('getBalance', () => {
  describe('when empty account value', () => {
    let subject: any;

    beforeEach(() => {
      subject = getBalance(null, Currencies.GBP);
    });

    it('returns no amount', () => {
      expect(subject.amount).toBe(undefined);
    });

    it('returns no formatted amount', () => {
      expect(subject.amountFormatted).toBe(undefined);
    });
  });

  describe('when empty currency value', () => {
    let subject: any;

    beforeEach(() => {
      subject = getBalance(createAccount(), null);
    });

    it('returns no amount', () => {
      expect(subject.amount).toBe(undefined);
    });

    it('returns no formatted amount', () => {
      expect(subject.amountFormatted).toBe(undefined);
    });
  });

  describe('when currency does not have a pocket', () => {
    let subject: any;

    beforeEach(() => {
      subject = getBalance(createAccount(), 'LT' as Currencies);
    });

    it('returns no amount', () => {
      expect(subject.amount).toBe(undefined);
    });

    it('returns no formatted amount', () => {
      expect(subject.amountFormatted).toBe(undefined);
    });
  });

  describe('when currency does have a pocket', () => {
    describe('when the amount > 0', () => {
      let subject: any;

      beforeEach(() => {
        subject = getBalance(createAccount(), Currencies.USD);
      });

      it('returns correct amount', () => {
        expect(subject.amount).toBe(80);
      });

      it('returns correct formatted amount', () => {
        expect(subject.amountFormatted).toBe('$80.00');
      });
    });

    describe('when there the amount = 0', () => {
      let subject: any;
      const account = createAccount({
        pockets: [
          {
            currency: Currencies.USD,
            amount: 0,
          },
        ],
      });

      beforeEach(() => {
        subject = getBalance(account, Currencies.USD);
      });

      it('returns correct amount', () => {
        expect(subject.amount).toBe(0);
      });

      it('returns correct formatted amount', () => {
        expect(subject.amountFormatted).toBe(0);
      });
    });
  });
});
