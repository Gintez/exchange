import recalculateExchangeAmount from './recalculate-exchange-amount';

describe('recalculateExchangeAmount', () => {
  const exchangeRate = 4.2;
  const exchangeAmount = {
    buy: 15,
    sell: 21.14,
  }

  it('returns sell amount unchanged', () => {
    const subject = recalculateExchangeAmount({
      exchangeRate,
      exchangeAmount,
    });

    expect(subject.sell).toBe(exchangeAmount.sell);
  });

  it('returns buy amount recalculated', () => {
    const subject = recalculateExchangeAmount({
      exchangeRate,
      exchangeAmount,
    });

    expect(subject.buy).not.toBe(exchangeAmount.buy);
  });
});
