import React from 'react';
import { Button, Stack, Tooltip, Typography } from '@mui/material';

export const RewardsSummary: React.FC<{
  totalDelegation: number;
  totalRewards: number;
  currency: string;
  onClickRedeemAll?: () => void;
}> = ({ totalDelegation, totalRewards, currency, onClickRedeemAll }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack direction="row" spacing={4}>
      <Stack direction="row" spacing={2}>
        <Typography>Total delegation amount:</Typography>
        <Typography fontWeight={600}>
          {totalDelegation} {currency}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography>Total rewards:</Typography>
        <Typography fontWeight={600}>
          {totalRewards} {currency}
        </Typography>
      </Stack>
    </Stack>
    <Tooltip title="Redeeming all rewards at once will be cheaper" arrow placement="left">
      <Button variant="outlined" color="secondary" size="large" onClick={onClickRedeemAll}>
        Redeem all rewards
      </Button>
    </Tooltip>
  </Stack>
);
