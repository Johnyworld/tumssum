import { Story, Meta } from '@storybook/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import CalendarDateItem, { CalendarDateItemProps } from './CalendarDateItem';

export default {
  title: 'Organisms/Calendar/CalendarDateItem',
  component: CalendarDateItem,
  argTypes: {},
} as Meta;

const Template: Story<CalendarDateItemProps> = args => <CalendarDateItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  day: {
    yyyymmdd: '2022-02-10',
    accounts: fixtureAccounts,
  },
};

export const CASE_NoItems = Template.bind({});
CASE_NoItems.args = {
  day: {
    yyyymmdd: '2022-02-10',
  },
};
