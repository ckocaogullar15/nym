import React from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalStyle } from '../Modals/styles';

export const RedeemModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  amount: number;
  fee: number;
  minimum?: number;
  currency: string;
  message: string;
}> = ({ open, onClose, amount, fee, minimum, currency, message }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={20} fontWeight={600}>
          {message}
        </Typography>
        <CloseIcon onClick={onClose} />
      </Stack>
      <Typography mt={0.5} mb={3} fontSize="small" color={(theme) => theme.palette.text.secondary}>
        Rewards from delegations
      </Typography>

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

      <Box borderTop="1px solid" borderColor="rgba(141, 147, 153, 0.2)" my={1} />

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

      <Button variant="contained" fullWidth sx={{ mt: 3 }} size="large" onClick={onClose}>
        Redeem rewards
      </Button>
    </Box>
  </Modal>
);
