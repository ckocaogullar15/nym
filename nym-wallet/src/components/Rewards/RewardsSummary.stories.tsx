import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Paper } from '@mui/material';
import { RewardsSummary } from './RewardsSummary';

export default {
  title: 'Rewards/Rewards Summary',
  component: RewardsSummary,
} as ComponentMeta<typeof RewardsSummary>;

export const Default = () => (
  <Paper elevation={0} sx={{ px: 4, py: 2 }}>
    <RewardsSummary totalDelegation={860.123} totalRewards={4.86723} currency="NYM" />
  </Paper>
);
