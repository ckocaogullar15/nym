import { Decimal } from '@cosmjs/math';
import { Coin } from '../../types';

// NARROW NO-BREAK SPACE (U+202F)
const thinSpace = '\u202F';

// stolen with love from `clients/validator/src/currency.ts`
// TODO: consolidate types and methods

/**
 * Formats a coin type as a string
 * @param coin Currency value
 */
export function printableCoin(coin?: Coin): string {
  if (!coin) {
    return '0';
  }
  if (coin.denom.startsWith('u') || coin.denom.startsWith('U')) {
    const ticker = coin.denom.slice(1).toUpperCase();
    return Decimal.fromAtomics(coin.amount, 6).toString() + thinSpace + ticker;
  }
  return coin.amount + thinSpace + coin.denom;
}
