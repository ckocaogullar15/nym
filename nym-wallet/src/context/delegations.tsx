import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Coin, Network } from '../types';
import type { DelegateListItem } from '../components/Delegation/types';

export type TDelegationContext = {
  isLoading: boolean;
  error?: string;
  delegations?: DelegateListItem[];
  totalDelegations?: Coin;
  refresh: () => Promise<void>;
  getDelegations: () => Promise<DelegateListItem[]>;
  addDelegation: (newDelegation: DelegateListItem) => Promise<void>;
  updateDelegation: (newDelegation: DelegateListItem) => Promise<void>;
  undelegate: (mixnodeAddress: string) => Promise<void>;
};

export const DelegationContext = createContext<TDelegationContext>({
  isLoading: true,
  refresh: async () => undefined,
  getDelegations: async () => [],
  addDelegation: async () => undefined,
  updateDelegation: async () => undefined,
  undelegate: async () => undefined,
});

export const DelegationContextProvider: FC<{
  network: Network;
}> = ({ network, children }) => {
  const [currentNetwork, setCurrentNetwork] = useState<undefined | Network>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [delegations, setDelegations] = useState<undefined | DelegateListItem[]>();
  const [totalDelegations, setTotalDelegations] = useState<undefined | Coin>();

  // TODO: implement
  const getDelegations = async (): Promise<DelegateListItem[]> => [];
  const addDelegation = async () => undefined;
  const updateDelegation = async () => undefined;
  const undelegate = async () => undefined;

  const resetState = () => {
    setIsLoading(true);
    setError(undefined);
    setTotalDelegations(undefined);
    setDelegations([]);
  };

  const refresh = useCallback(async () => {
    resetState();
    try {
      setDelegations(await getDelegations());
    } catch (e) {
      setError((e as Error).message);
    }
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
      isLoading,
      error,
      delegations,
      totalDelegations,
      refresh,
      getDelegations,
      addDelegation,
      updateDelegation,
      undelegate,
    }),
    [isLoading, error, delegations],
  );

  return <DelegationContext.Provider value={memoizedValue}>{children}</DelegationContext.Provider>;
};

export const useDelegationContext = () => useContext<TDelegationContext>(DelegationContext);
