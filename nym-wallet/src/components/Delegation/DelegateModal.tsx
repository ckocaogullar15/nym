import React from 'react';
import { Stack, Typography } from '@mui/material';
import { SimpleModal } from '../Modals/SimpleModal';
import { ModalDivider } from '../Modals/ModalDivider';
import { ModalListItem } from './ModalListItem';

export const DelegateModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  onOk?: () => void;
  header?: string;
  buttonText?: string;
  rewardInterval: string;
  accountBalance: number;
  minimum: number;
  profitMarginPercentage: number;
  nodeUptimePercentage: number;
  fee: number;
  currency: string;
}> = ({
  open,
  onClose,
  onOk,
  header,
  buttonText,
  rewardInterval,
  accountBalance,
  fee,
  minimum,
  currency,
  profitMarginPercentage,
  nodeUptimePercentage,
}) => (
  <SimpleModal
    open={open}
    onClose={onClose}
    onOk={onOk}
    header={header || 'Delegate'}
    subHeader="Delegate to mixnode"
    okLabel={buttonText || 'Delegate stake'}
  >
    <Stack direction="row" justifyContent="space-between" mb={3}>
      <Typography fontSize="larger" fontWeight={600}>
        Account balance
      </Typography>
      <Typography fontSize="larger" fontWeight={600}>
        {accountBalance} {currency}
      </Typography>
    </Stack>

    <ModalListItem label="Rewards payout interval" value={rewardInterval} />
    <ModalDivider />
    <ModalListItem label="Node profit margin" value={`${Math.round(profitMarginPercentage * 10000) / 100}%`} />
    <ModalDivider />
    <ModalListItem label="Node uptime" value={`${Math.round(nodeUptimePercentage * 10000) / 100}%`} />
    <ModalDivider />
    <ModalListItem label="Minimum to delegate" value={`${minimum} ${currency}`} />

    <Stack direction="row" justifyContent="space-between" mt={4}>
      <Typography color={(theme) => theme.palette.nym.fee}>Fee for this transaction:</Typography>
      <Typography color={(theme) => theme.palette.nym.fee}>
        {fee} {currency}
      </Typography>
    </Stack>
  </SimpleModal>
);
