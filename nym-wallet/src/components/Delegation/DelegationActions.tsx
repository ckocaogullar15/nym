import React from 'react';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Delegate, Undelegate } from '../../svg-icons';
import { DelegateListItemPending } from './types';

const BUTTON_SIZE = '32px';

export type DelegationListItemActions = 'delegate' | 'undelegate' | 'redeem';

export const DelegationActions: React.FC<{
  onActionClick?: (action: DelegationListItemActions) => void;
  isPending?: DelegateListItemPending;
}> = ({ onActionClick, isPending }) => {
  if (isPending) {
    return (
      <Box py={0.5} fontSize="inherit">
        <Tooltip title="There will be a new epoch roughly every hour when your changes will take effect" arrow>
          <Typography fontSize="inherit" color="text.disabled">
            Pending {isPending.actionType === 'delegate' ? 'delegation' : 'undelegation'}...
          </Typography>
        </Tooltip>
      </Box>
    );
  }
  return (
    <Stack spacing={2} direction="row">
      <Tooltip title="Delegate more" arrow>
        <Button
          onClick={() => (onActionClick ? onActionClick('delegate') : undefined)}
          variant="contained"
          disableElevation
          sx={{ maxWidth: BUTTON_SIZE, minWidth: BUTTON_SIZE, height: BUTTON_SIZE, padding: 0 }}
        >
          <Delegate fontSize="small" />
        </Button>
      </Tooltip>
      <Tooltip title="Undelegate" arrow>
        <Button
          variant="outlined"
          sx={{ maxWidth: BUTTON_SIZE, minWidth: BUTTON_SIZE, height: BUTTON_SIZE, padding: 0 }}
          onClick={() => (onActionClick ? onActionClick('undelegate') : undefined)}
        >
          <Undelegate fontSize="small" />
        </Button>
      </Tooltip>
      <Tooltip title="Redeem rewards" arrow>
        <Button
          onClick={() => (onActionClick ? onActionClick('redeem') : undefined)}
          variant="outlined"
          color="secondary"
          sx={{ maxWidth: BUTTON_SIZE, minWidth: BUTTON_SIZE, height: BUTTON_SIZE, padding: 0 }}
        >
          R
        </Button>
      </Tooltip>
    </Stack>
  );
};
