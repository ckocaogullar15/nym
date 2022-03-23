import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { DelegationContext, TDelegationTransaction } from '../delegations';
import type { DelegateListItem } from '../../components/Delegation/types';
import { mockSleep } from './utils';

const SLEEP_MS = 1000;

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
  const [trigger, setTrigger] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [delegations, setDelegations] = useState<undefined | DelegateListItem[]>();
  const [totalDelegations, setTotalDelegations] = useState<undefined | string>();

  const triggerStateUpdate = () => setTrigger(new Date());

  const getDelegations = async (): Promise<DelegateListItem[]> =>
    mockDelegations.sort((a, b) => a.id.localeCompare(b.id));

  const recalculate = async () => {
    const newDelegations = await getDelegations();
    const newTotalDelegations = `${newDelegations.length * 100} NYM`;
    setDelegations(newDelegations);
    setTotalDelegations(newTotalDelegations);
  };

  const addDelegation = async (newDelegation: DelegateListItem): Promise<TDelegationTransaction> => {
    await mockSleep(SLEEP_MS);
    mockDelegations.push({ ...newDelegation, isPending: { blockHeight: 1111, actionType: 'delegate' } });
    await recalculate();
    triggerStateUpdate();

    setTimeout(async () => {
      mockDelegations = mockDelegations.map((d) => {
        if (d.id === newDelegation.id) {
          return { ...d, isPending: undefined };
        }
        return d;
      });
      await recalculate();
      triggerStateUpdate();
    }, 3000);

    return {
      transactionUrl:
        'https://sandbox-blocks.nymtech.net/transactions/55303CD4B91FAC4C2715E40EBB52BB3B92829D9431B3A279D37B5CC58432E354',
    };
  };

  const updateDelegation = async (
    newDelegation: DelegateListItem,
    ignorePendingForStorybook?: boolean,
  ): Promise<TDelegationTransaction> => {
    if (ignorePendingForStorybook) {
      mockDelegations = mockDelegations.map((d) => {
        if (d.id === newDelegation.id) {
          return { ...newDelegation };
        }
        return d;
      });
      await recalculate();
      triggerStateUpdate();
      return {
        transactionUrl:
          'https://sandbox-blocks.nymtech.net/transactions/55303CD4B91FAC4C2715E40EBB52BB3B92829D9431B3A279D37B5CC58432E354',
      };
    }

    await mockSleep(SLEEP_MS);
    mockDelegations = mockDelegations.map((d) => {
      if (d.id === newDelegation.id) {
        return { ...newDelegation, isPending: { blockHeight: 1234, actionType: 'delegate' } };
      }
      return d;
    });
    await recalculate();
    triggerStateUpdate();

    setTimeout(async () => {
      mockDelegations = mockDelegations.map((d) => {
        if (d.id === newDelegation.id) {
          return { ...d, isPending: undefined };
        }
        return d;
      });
      await recalculate();
      triggerStateUpdate();
    }, 3000);

    return {
      transactionUrl:
        'https://sandbox-blocks.nymtech.net/transactions/55303CD4B91FAC4C2715E40EBB52BB3B92829D9431B3A279D37B5CC58432E354',
    };
  };

  const undelegate = async (mixnodeAddress: string): Promise<TDelegationTransaction> => {
    await mockSleep(SLEEP_MS);
    mockDelegations = mockDelegations.map((d) => {
      if (d.id === mixnodeAddress) {
        return { ...d, isPending: { blockHeight: 5678, actionType: 'undelegate' } };
      }
      return d;
    });
    await recalculate();
    triggerStateUpdate();

    setTimeout(async () => {
      mockDelegations = mockDelegations.filter((d) => d.id !== mixnodeAddress);
      await recalculate();
      triggerStateUpdate();
    }, 3000);

    return {
      transactionUrl:
        'https://sandbox-blocks.nymtech.net/transactions/55303CD4B91FAC4C2715E40EBB52BB3B92829D9431B3A279D37B5CC58432E354',
    };
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
        await mockSleep(SLEEP_MS);
        await recalculate();
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
    [isLoading, error, delegations, totalDelegations, trigger],
  );

  return <DelegationContext.Provider value={memoizedValue}>{children}</DelegationContext.Provider>;
};
