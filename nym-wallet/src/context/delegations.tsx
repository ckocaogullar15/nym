import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Coin, Network } from '../types';
import type { DelegateListItem } from '../components/Delegation/types';

export type TDelegationContext = {
  isLoading: boolean;
  error?: string;
  delegations?: DelegateListItem[];
  totalDelegations?: string;
  refresh: () => Promise<void>;
  getDelegations: () => Promise<DelegateListItem[]>;
  addDelegation: (newDelegation: DelegateListItem) => Promise<TDelegationTransaction>;
  updateDelegation: (newDelegation: DelegateListItem) => Promise<TDelegationTransaction>;
  undelegate: (mixnodeAddress: string) => Promise<TDelegationTransaction>;
};

export type TDelegationTransaction = {
  transactionUrl: string;
};

export const DelegationContext = createContext<TDelegationContext>({
  isLoading: true,
  refresh: async () => undefined,
  getDelegations: async () => [],
  addDelegation: async () => {
    throw new Error('Not implemented');
  },
  updateDelegation: async () => {
    throw new Error('Not implemented');
  },
  undelegate: async () => {
    throw new Error('Not implemented');
  },
});

export const DelegationContextProvider: FC<{
  network: Network;
}> = ({ network, children }) => {
  const [currentNetwork, setCurrentNetwork] = useState<undefined | Network>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [delegations, setDelegations] = useState<undefined | DelegateListItem[]>();
  const [totalDelegations, setTotalDelegations] = useState<undefined | string>();

  // TODO: implement
  const getDelegations = async (): Promise<DelegateListItem[]> => [];
  const addDelegation = async (): Promise<TDelegationTransaction> => {
    throw new Error('Not implemented');
  };
  const updateDelegation = async (): Promise<TDelegationTransaction> => {
    throw new Error('Not implemented');
  };
  const undelegate = async (): Promise<TDelegationTransaction> => {
    throw new Error('Not implemented');
  };

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
