import { calculateBuyAmount, calculateSellAmount } from './calculate-amount';

describe('calculateSellAmount', () => {
  it('calculates sell amount correctly', () => {
    const subject = calculateSellAmount({ amount: 4.7, exchangeRate: 1.235 });

    expect(subject).toBe(3.8);
  })

  describe('when amount is not a number', () => {
    it('returns empty value', () => {
      const subject = calculateSellAmount({ amount: null, exchangeRate: 1.235 });
  
      expect(subject).toBe(null);
    })
  })
})

describe('calculateBuyAmount', () => {
  it('calculates buy amount correctly', () => {
    const subject = calculateBuyAmount({ amount: 4.7, exchangeRate: 1.235 });

    expect(subject).toBe(5.8);
  })

  describe('when amount is not a number', () => {
    it('returns empty value', () => {
      const subject = calculateBuyAmount({ amount: null, exchangeRate: 1.235 });
  
      expect(subject).toBe(null);
    })
  })
})