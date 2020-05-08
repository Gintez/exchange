import { createAccount } from 'helpers/mocks/account';

import getInitialExchangePair from './get-initial-exchange-pair';

describe('getInitialExchangePair', () => {
  it('returns account primary currency as sell currency', () => {
    const account = createAccount();
    const subject = getInitialExchangePair(account);

    expect(subject.sell).toBe(account.primaryCurrency);
  })

  it('returns first currency in account pockets which is not primary as buy currency', () => {
    const account = createAccount();
    const subject = getInitialExchangePair(account);

    expect(subject.sell).toBe(account.primaryCurrency);
  })
})
