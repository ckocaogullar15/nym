import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import type { Coin } from '../../types';
import { DelegationContext } from '../delegations';
import type { DelegateListItem } from '../../components/Delegation/types';

let mockDelegations: DelegateListItem[] = [
  {
    id: 'FiojKW7oY9WQmLCiYAsCA21tpowZHS6zcUoyYm319p6Z',
    delegationDate: new Date(2021, 1, 1),
    amount: '452 NYM',
    uptimePercentage: 0.832,
    profitMarginPercentage: 0.1122323949234,
    reward: '0.001523434 NYM',
  },
  {
    id: 'DT8S942S8AQs2zKHS9SVo1GyHmuca3pfL2uLhLksJ3D8',
    delegationDate: new Date(2021, 1, 2),
    amount: '1000000 NYM',
    uptimePercentage: 0.2323423424,
    profitMarginPercentage: 0.1,
    reward: '234.234  NYM',
  },
  {
    id: '6hn3z2yCQ3KP8XyqMRMV4c6DvYWG1vvrAWpgkxe1CV9C',
    delegationDate: new Date(2021, 1, 3),
    amount: '1 NYM',
    uptimePercentage: 1.0,
    profitMarginPercentage: 0.11,
    reward: '0.00156 NYM',
  },
];

export const MockDelegationContextProvider: FC<{}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [delegations, setDelegations] = useState<undefined | DelegateListItem[]>();
  const [totalDelegations, setTotalDelegations] = useState<undefined | string>();

  const getDelegations = async (): Promise<DelegateListItem[]> =>
    mockDelegations.sort((a, b) => a.id.localeCompare(b.id));

  const addDelegation = async (newDelegation: DelegateListItem): Promise<void> => {
    mockDelegations.push(newDelegation);
  };

  const updateDelegation = async (newDelegation: DelegateListItem): Promise<void> => {
    mockDelegations = mockDelegations.map((d) => {
      if (d.id === newDelegation.id) {
        return { ...newDelegation, isPending: { blockHeight: 1234, actionType: 'delegate' } };
      }
      return d;
    });
  };

  const undelegate = async (mixnodeAddress: string): Promise<void> => {
    mockDelegations = mockDelegations.map((d) => {
      if (d.id === mixnodeAddress) {
        return { ...d, isPending: { blockHeight: 5678, actionType: 'undelegate' } };
      }
      return d;
    });

    setTimeout(() => {
      mockDelegations = mockDelegations.filter((d) => d.id === mixnodeAddress);
    }, 3000);
  };

  const resetState = () => {
    setIsLoading(true);
    setError(undefined);
    setTotalDelegations(undefined);
    setDelegations([]);
  };

  const refresh = useCallback(async () => {
    resetState();
    setTimeout(async () => {
      try {
        const newDelegations = await getDelegations();
        const newTotalDelegations = '678 NYM';
        setDelegations(newDelegations);
        setTotalDelegations(newTotalDelegations);
        setIsLoading(false);
      } catch (e) {
        setError((e as Error).message);
      }
      setIsLoading(false);
    }, 2000);
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
      delegations,
      totalDelegations,
      refresh,
      getDelegations,
      addDelegation,
      updateDelegation,
      undelegate,
    }),
    [isLoading, error, delegations, totalDelegations],
  );

  return <DelegationContext.Provider value={memoizedValue}>{children}</DelegationContext.Provider>;
};
