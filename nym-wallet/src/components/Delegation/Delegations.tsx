import React from 'react';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { DelegateListItem } from './types';
import { DelegationList } from './DelegationList';
import { DelegationListItemActions } from './DelegationActions';

export const Delegations: React.FC<{
  isLoading?: boolean;
  items?: DelegateListItem[];
  explorerUrl: string;
  onShowNewDelegation?: () => void;
  onDelegationItemActionClick?: (item: DelegateListItem, action: DelegationListItemActions) => void;
}> = ({ isLoading, items, explorerUrl, onShowNewDelegation, onDelegationItemActionClick }) => (
  <>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2} mb={5}>
      <Box>
        <Link
          href={`${explorerUrl}/network-components/mixnodes/`}
          target="_blank"
          rel="noreferrer"
          underline="hover"
          color={(theme) => theme.palette.text.primary}
        >
          Check the{' '}
          <Typography color="primary.main" component="span">
            list of mixnodes
          </Typography>{' '}
          for uptime and performance to make delegation decisions
        </Link>
      </Box>
      <Button variant="contained" sx={{ py: 1.5, px: 5 }} onClick={onShowNewDelegation}>
        New Delegation
      </Button>
    </Stack>
    <DelegationList
      isLoading={isLoading}
      items={items}
      explorerUrl={explorerUrl}
      onItemActionClick={onDelegationItemActionClick}
    />
  </>
);
