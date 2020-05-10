import { createExchangeRates } from 'helpers/mocks/exchange-rates';

import formatExchangeRatesResponse from './format-exchange-rates-response';

const createExchangeRateResponse = () => [
  createExchangeRates({ base: 'EUR' }),
  createExchangeRates({ base: 'GBP' }),
];

describe('formatExchangeRatesResponse', () => {
  it('return an empty object when no currencies provided', () => {
    const subject = formatExchangeRatesResponse([]);
    expect(subject).toMatchObject({});
  });

  it('returns an object with base currencies as key values', () => {
    const exchangeRateResponseMock = createExchangeRateResponse();
    const subject = formatExchangeRatesResponse(exchangeRateResponseMock);
    expect(Object.keys(subject)).toMatchObject(['EUR', 'GBP']);
  });

  it('returns an object with available currency rates', () => {
    const exchangeRateResponseMock = createExchangeRateResponse();
    const subject = formatExchangeRatesResponse(exchangeRateResponseMock);
    expect(subject).toMatchObject({
      EUR: {
        USD: 1.0807,
        GBP: 80.7789,
      },
      GBP: {
        USD: 1.0807,
        EUR: 7.569,
      },
    });
  });
});
