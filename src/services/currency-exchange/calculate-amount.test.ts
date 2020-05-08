import { calculateBuyAmount, calculateSellAmount } from './calculate-amount';

describe('calculateSellAmount', () => {
  it('returns correctly calculated sell amount', () => {
    const subject = calculateSellAmount({ amount: 4.7, exchangeRate: 1.235 });
    expect(subject).toBe(3.8);
  })

  it('returns empty value if amount is not a number', () => {
    const subject = calculateSellAmount({ amount: null, exchangeRate: 1.235 });
    expect(subject).toBe(null);
  })
})

describe('calculateSellAmount', () => {
  it('returns correctly calculated buy amount', () => {
    const subject = calculateBuyAmount({ amount: 4.7, exchangeRate: 1.235 });
    expect(subject).toBe(5.8);
  })

  it('returns empty value if amount is not a number', () => {
  const subject = calculateSellAmount({ amount: null, exchangeRate: 1.235 });
    expect(subject).toBe(null);
  })
})