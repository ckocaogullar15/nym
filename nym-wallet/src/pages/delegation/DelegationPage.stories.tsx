import * as React from 'react';
import { DelegationPage } from './index';
import { MockDelegationContextProvider } from '../../context/mocks/delegations';

export default {
  title: 'Delegation/Flows/Mock',
};

export const Default = () => (
  <MockDelegationContextProvider>
    <DelegationPage />
  </MockDelegationContextProvider>
);
