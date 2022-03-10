import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Paper } from '@mui/material';
import { Delegations } from './Delegations';
import { items } from './DelegationList.stories';
import { DelegationModal } from './DelegationModal';

const explorerUrl = 'https://sandbox-explorer.nymtech.net';

export default {
  title: 'Delegation/Delegation Modals',
  component: Delegations,
} as ComponentMeta<typeof Delegations>;

const transactionUrl =
  'https://sandbox-blocks.nymtech.net/transactions/11ED7B9E21534A9421834F52FED5103DC6E982949C06335F5E12EFC71DAF0CFB';
const balance = '104 NYMT';
const recipient = 'nymt1923pujepxfnv8dqyxqrl078s4ysf3xn2p7z2xa';

export const DelegateSuccess = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
    <DelegationModal
      status="success"
      action="delegate"
      message="You delegated 5 NYM"
      recipient={recipient}
      balance={balance}
      transactionUrl={transactionUrl}
      open
    />
  </>
);

export const UndelegateSuccess = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
    <DelegationModal
      status="success"
      action="undelegate"
      message="You undelegated 5 NYM"
      recipient={recipient}
      balance={balance}
      transactionUrl={transactionUrl}
      open
    />
  </>
);

export const RedeemSuccess = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
    <DelegationModal
      status="success"
      action="redeem"
      message="42 NYM"
      recipient={recipient}
      balance={balance}
      transactionUrl={transactionUrl}
      open
    />
  </>
);

export const RedeemAllSuccess = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
    <DelegationModal
      status="success"
      action="redeem-all"
      message="42 NYM"
      recipient={recipient}
      balance={balance}
      transactionUrl={transactionUrl}
      open
    />
  </>
);

export const Error = () => (
  <>
    <Paper elevation={0} sx={{ px: 4, pt: 2, pb: 4 }}>
      <h2>Your Delegations</h2>
      <Delegations items={items} rewardCurrency="NYM" explorerUrl={explorerUrl} />
    </Paper>
    <DelegationModal
      status="error"
      action="redeem-all"
      message="Minim esse veniam Lorem id velit Lorem eu eu est. Excepteur labore sunt do proident proident sint aliquip consequat Lorem sint non nulla ad excepteur."
      recipient={recipient}
      balance={balance}
      transactionUrl={transactionUrl}
      open
    />
  </>
);
