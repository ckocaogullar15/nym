import React from 'react';
import { Box, Button, Link, Stack } from '@mui/material';
import { DelegateListItem } from './types';
import { DelegationList } from './DelegationList';

export const Delegations: React.FC<{
  items?: DelegateListItem[];
  rewardCurrency: string;
  explorerUrl: string;
}> = ({ items, rewardCurrency, explorerUrl }) => (
  <>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2} mb={5}>
      <Box>
        Check list of mixnodes for uptime and performances to make delegation decisions{' '}
        <Link href={`${explorerUrl}/network-components/mixnodes/`} target="_blank" rel="noreferrer">
          click here
        </Link>
      </Box>
      <Button variant="contained" sx={{ py: 1.5, px: 5 }}>
        New Delegation
      </Button>
    </Stack>
    {items?.length ? <DelegationList items={items} rewardCurrency={rewardCurrency} explorerUrl={explorerUrl} /> : null}
  </>
);
