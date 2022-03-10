import React from 'react';
import { Button, Stack, Tooltip } from '@mui/material';
import { Delegate, Undelegate } from '../../svg-icons';

const BUTTON_SIZE = '32px';

export type DelegationListItemActions = 'delegate' | 'undelegate' | 'redeem';

export const DelegationActions: React.FC<{
  onActionClick?: (action: DelegationListItemActions) => void;
}> = ({ onActionClick }) => (
  <Stack spacing={2} direction="row">
    <Tooltip title="Delegate more" arrow>
      <Button
        onClick={() => (onActionClick ? onActionClick('delegate') : undefined)}
        variant="contained"
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
