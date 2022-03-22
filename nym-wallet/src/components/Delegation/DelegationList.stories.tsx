import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DelegationList } from './DelegationList';
import { DelegateListItem } from './types';

export default {
  title: 'Delegation/Components/Delegation List',
  component: DelegationList,
} as ComponentMeta<typeof DelegationList>;

const explorerUrl = 'https://sandbox-explorer.nymtech.net/network-components/mixnodes';

export const items: DelegateListItem[] = [
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
    isPending: {
      actionType: 'delegate',
      blockHeight: 1234,
    },
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

export const WithData = () => <DelegationList items={items} explorerUrl={explorerUrl} />;

export const Empty = () => <DelegationList items={[]} explorerUrl={explorerUrl} />;

export const OneItem = () => <DelegationList items={[items[0]]} explorerUrl={explorerUrl} />;

export const Loading = () => <DelegationList isLoading explorerUrl={explorerUrl} />;
