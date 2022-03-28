import type { CurrencyDenom } from './currencyDenom';
import type { StringMajorAmount } from './currencyStringMajorAmount';

export interface MajorCurrency {
  amount: StringMajorAmount;
  denom: CurrencyDenom;
}
