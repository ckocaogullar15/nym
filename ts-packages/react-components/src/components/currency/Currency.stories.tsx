import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Currency } from './Currency';

export default {
  title: 'Currency/Currency display',
  component: Currency,
} as ComponentMeta<typeof Currency>;

export const Major = () => <Currency coin={{ amount: '42.123456', denom: 'NYM' }} />;

export const Minor = () => <Currency coin={{ amount: '42123456', denom: 'UNYM' }} />;

export const TestnetMajor = () => <Currency coin={{ amount: '42.123456', denom: 'NYMT' }} />;

export const TestnetMinor = () => <Currency coin={{ amount: '42123456', denom: 'UNYMT' }} />;

export const Empty = () => <Currency />;
