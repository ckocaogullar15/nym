import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DelegatorsInfoTable } from './Table';
import { delegatorsInfoColumns } from './Columns';
import { DelegatorsInfoRowWithIndex } from './types';

export default {
  title: 'Mix Node Detail/Economics/Table',
  component: DelegatorsInfoTable,
} as ComponentMeta<typeof DelegatorsInfoTable>;

const row: DelegatorsInfoRowWithIndex = {
  id: 1,
  active_set_probability: {
    value: 50,
    displayEconProgress: true,
  },
  avg_uptime: {
    value: '65 %',
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
    value: 120,
    displayEconProgress: true,
  },
};

const Template: ComponentStory<typeof DelegatorsInfoTable> = (args) => <DelegatorsInfoTable {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Default = Template.bind({});
Default.args = {
  rows: [row],
  columnsData: delegatorsInfoColumns,
  tableName: 'storybook',
};
