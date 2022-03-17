import React from 'react';

import { Paper } from '@mui/material';
import { RewardsSummary } from '../../components/Rewards/RewardsSummary';
import { Delegations } from '../../components/Delegation/Delegations';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export const DelegationPage: React.FC = () => {
  const delegations = [
    {
      id: 'FiojKW7oY9WQmLCiYAsCA21tpowZHS6zcUoyYm319p6Z',
      delegationDate: new Date(2021, 1, 1),
      amount: 452,
      amountCurrency: 'NYM',
      uptimePercentage: 0.832,
      profitMarginPercentage: 0.1122323949234,
      reward: 0.001523434,
    },
    {
      id: 'DT8S942S8AQs2zKHS9SVo1GyHmuca3pfL2uLhLksJ3D8',
      delegationDate: new Date(2021, 1, 2),
      amount: 1000000,
      amountCurrency: 'NYM',
      uptimePercentage: 0.2323423424,
      profitMarginPercentage: 0.1,
      reward: 234.234,
    },
    {
      id: '6hn3z2yCQ3KP8XyqMRMV4c6DvYWG1vvrAWpgkxe1CV9C',
      delegationDate: new Date(2021, 1, 3),
      amount: 1,
      amountCurrency: 'NYM',
      uptimePercentage: 1.0,
      profitMarginPercentage: 0.11,
      reward: 0.00156,
    },
  ];
  return (
    <>
      <Paper elevation={0} sx={{ px: 4, py: 2, mb: 4 }}>
        <RewardsSummary totalDelegation={860.123} totalRewards={4.86723} currency="NYM" />
      </Paper>

      <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
        <h2>Your Delegations</h2>
        <Delegations items={delegations} rewardCurrency="NYM" explorerUrl={explorerUrl} />
      </Paper>
    </>
  );
};
