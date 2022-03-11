import React from 'react';
import { Stack, Typography } from '@mui/material';
import { SimpleModal } from '../Modals/SimpleModal';
import { ModalDivider } from '../Modals/ModalDivider';

export const RedeemModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  onOk?: () => void;
  amount: number;
  fee: number;
  minimum?: number;
  currency: string;
  message: string;
}> = ({ open, onClose, onOk, amount, fee, minimum, currency, message }) => (
  <SimpleModal
    open={open}
    onClose={onClose}
    onOk={onOk}
    header={message}
    subHeader="Rewards from delegations"
    okLabel="Redeem rewards"
  >
    <Stack direction="row" justifyContent="space-between" mb={4}>
      <Typography>Rewards amount:</Typography>
      <Typography>
        {amount} {currency}
      </Typography>
    </Stack>

    <Stack direction="row" justifyContent="space-between">
      <Typography fontSize="smaller">Minimum reward to redeem:</Typography>
      <Typography fontSize="smaller">
        {minimum || '1'} {currency}
      </Typography>
    </Stack>

    <ModalDivider />

    <Typography mb={5} fontSize="smaller">
      Rewards will be transferred to your main account.
    </Typography>

    <Stack direction="row" justifyContent="space-between">
      <Typography fontSize="smaller" color={(theme) => theme.palette.nym.fee}>
        Fee for this transaction:
      </Typography>
      <Typography fontSize="smaller" color={(theme) => theme.palette.nym.fee}>
        {fee} {currency}
      </Typography>
    </Stack>
  </SimpleModal>
);
