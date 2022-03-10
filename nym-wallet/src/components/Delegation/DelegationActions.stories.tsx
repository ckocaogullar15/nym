import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DelegationActions } from './DelegationActions';

export default {
  title: 'Delegation/Delegation List Item Actions',
  component: DelegationActions,
} as ComponentMeta<typeof DelegationActions>;

export const Default = () => <DelegationActions />;
