import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Paper } from '@mui/material';
import { Delegations } from './Delegations';
import { items } from './DelegationList.stories';
import { RewardsSummary } from '../Rewards';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export default {
  title: 'Delegation/Flows/Mock',
  component: Delegations,
} as ComponentMeta<typeof Delegations>;

export const Default = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, py: 2, mb: 4 }}>
      <RewardsSummary totalDelegation={860.123} totalRewards={4.86723} currency="NYM" />
    </Paper>

    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
  </>
);
