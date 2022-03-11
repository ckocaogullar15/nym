import * as React from 'react';
import { Coin, printableCoin } from '@nymproject/types';

export const Currency: React.FC<{
  coin?: Coin;
}> = ({ coin }) => {
  const coinStr = React.useMemo(() => (coin ? printableCoin(coin) : '-'), [coin?.denom, coin?.amount]);
  return <span>{coinStr}</span>;
};
