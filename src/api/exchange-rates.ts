import axios from 'axios';

import { Currencies } from 'types';

export const getExchangeRates = (base: Currencies) =>
  axios.get(`https://api.exchangeratesapi.io/latest`, {
    params: { base },
  });
