import React from 'react';
import { Stack, Typography } from '@mui/material';
import { IdentityKeyFormField } from '@nymproject/react';
import { SimpleModal } from '../Modals/SimpleModal';
import { ModalDivider } from '../Modals/ModalDivider';

export const UndelegateModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  onOk?: () => void;
  identityKey: string;
  amount: number;
  fee: number;
  minimum?: number;
  currency: string;
}> = ({ identityKey, open, onClose, onOk, amount, fee, minimum = 5, currency }) => (
  <SimpleModal
    open={open}
    onClose={onClose}
    onOk={onOk}
    header="Undelegate"
    subHeader="Undelegate from mixnode"
    okLabel="Undelegate stake"
  >
    <IdentityKeyFormField
      readOnly
      fullWidth
      placeholder="Node identity key"
      initialValue={identityKey}
      showTickOnValid={false}
    />

    <Stack direction="row" justifyContent="space-between" my={3}>
      <Typography fontSize="larger" fontWeight={600}>
        Delegation amount:
      </Typography>
      <Typography fontSize="larger" fontWeight={600}>
        {amount} {currency}
      </Typography>
    </Stack>

    <Stack direction="row" justifyContent="space-between">
      <Typography>Minimum to undelegate:</Typography>
      <Typography>
        {minimum} {currency}
      </Typography>
    </Stack>

    <ModalDivider />

    <Typography mb={5}>Undelegated tokens will be transferred to your main account.</Typography>

    <Stack direction="row" justifyContent="space-between" mt={3}>
      <Typography color={(theme) => theme.palette.nym.fee}>Fee for this transaction:</Typography>
      <Typography color={(theme) => theme.palette.nym.fee}>
        {fee} {currency}
      </Typography>
    </Stack>
  </SimpleModal>
);
