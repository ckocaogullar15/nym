import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { DelegatorsInfoTable } from './delegators-info-table';
import { delegatorsInfoColumns } from './delegators-info-columns';
import { delegatorsInfoRows } from './delegators-info-rows';
import { DelegatorsInfoRowWithIndex } from './types';

export default {
  title: 'Mix Node Detail/Economics',
  component: DelegatorsInfoTable,
} as ComponentMeta<typeof DelegatorsInfoTable>;

export const Default = () => {
  const row: DelegatorsInfoRowWithIndex = {
    id: 1,
    active_set_probability: {
      value: '50 %',
      visualProgressValue: 50,
    },
    avg_uptime: {
      value: 65,
    },
    estimated_operator_reward: {
      value: '80000.123456 NYM',
    },
    estimated_total_reward: {
      value: '80000.123456 NYM',
    },
    profit_margin: {
      value: '10 %',
    },
    stake_saturation: {
      value: '120 %',
      visualProgressValue: 120,
    },
  };
  return <DelegatorsInfoTable columnsData={delegatorsInfoColumns} tableName="storybook" rows={[row]} />;
};