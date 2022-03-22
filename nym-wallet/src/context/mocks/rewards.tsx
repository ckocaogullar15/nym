import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RewardsContext } from '../rewards';

export const MockRewardsContextProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [totalRewards, setTotalRewards] = useState<undefined | string>();

  const resetState = () => {
    setIsLoading(true);
    setError(undefined);
    setTotalRewards(undefined);
  };

  const refresh = useCallback(async () => {
    resetState();
    setTimeout(() => {
      setTotalRewards('4.567 NYM');
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // reset state and refresh
    resetState();
    refresh();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      error,
      totalRewards,
      refresh,
    }),
    [isLoading, error, totalRewards],
  );

  return <RewardsContext.Provider value={memoizedValue}>{children}</RewardsContext.Provider>;
};
