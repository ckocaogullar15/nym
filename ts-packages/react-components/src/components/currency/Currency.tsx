import * as React from 'react';
import type { Coin } from '@nymproject/types';
import { printableCoin } from '@nymproject/types';

export const Currency: React.FC<{
  coin?: Coin;
}> = ({ coin }) => {
  const coinStr = React.useMemo(() => (coin ? printableCoin(coin) : '-'), [coin?.denom, coin?.amount]);
  return <span>{coinStr}</span>;
};
