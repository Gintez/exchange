import { State } from 'store';

import { NAMESPACE } from './constants';
import { DefaultState } from './reducer';

export const getAccount = (state: State): DefaultState => state?.[NAMESPACE];
