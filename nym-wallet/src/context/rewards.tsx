import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Coin, Network } from '../types';

type TRewardsContext = {
  isLoading: boolean;
  network?: Network;
  error?: string;
  totalRewards?: Coin;
  refresh: () => Promise<void>;
};

export const RewardsContext = createContext<TRewardsContext>({
  isLoading: true,
  refresh: async () => undefined,
});

export const RewardsContextProvider: FC<{
  network: Network;
}> = ({ network, children }) => {
  const [currentNetwork, setCurrentNetwork] = useState<undefined | Network>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [totalRewards, setTotalRewards] = useState<undefined | Coin>();

  const resetState = () => {
    setIsLoading(true);
    setError(undefined);
    setTotalRewards(undefined);
  };

  // TODO: implement
  const refresh = useCallback(async () => {
    resetState();
    // TODO: do work

    setIsLoading(false);
  }, [network]);

  useEffect(() => {
    if (currentNetwork !== network) {
      // reset state and refresh
      resetState();
      setCurrentNetwork(network);
      refresh();
    }
  }, [network]);

  const memoizedValue = useMemo(
    () => ({
      network: currentNetwork,
      isLoading,
      error,
      totalRewards,
      refresh,
    }),
    [isLoading, error, totalRewards, network],
  );

  return <RewardsContext.Provider value={memoizedValue}>{children}</RewardsContext.Provider>;
};

export const useRewardsContext = useContext<TRewardsContext>(RewardsContext);
