import React, { FC } from 'react';
// import { invoke } from '@tauri-apps/api';
import { Paper } from '@mui/material';
import { RewardsSummary } from '../../components/Rewards/RewardsSummary';
import { Delegations } from '../../components/Delegation/Delegations';
import { useDelegationContext } from '../../context/delegations';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export const DelegationPage: FC = () => {
  // React.useEffect(() => {
  //   invoke('get_delegation_summary').then((result) => console.log('get_delegation_summary', result));
  // }, []);

  const { delegations } = useDelegationContext();
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
