import React from 'react';
import { Stack, Typography } from '@mui/material';

export const ModalListItem: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography>{label}:</Typography>
    <Typography>{value}</Typography>
  </Stack>
);
