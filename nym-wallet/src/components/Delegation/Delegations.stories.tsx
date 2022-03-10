import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Delegations } from './Delegations';
import { items } from './DelegationList.stories';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export default {
  title: 'Delegation/Delegations',
  component: Delegations,
} as ComponentMeta<typeof Delegations>;

export const Default = () => <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />;

export const Empty = () => <Delegations items={[]} rewardCurrency="NYM" explorerUrl={explorerUrl} />;
