import { Story, Meta } from '@storybook/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import CalendarDateRow, { CalendarDateRowProps } from './CalendarDateRow';

export default {
  title: 'Organisms/Calendar/CalendarDateRow',
  component: CalendarDateRow,
  argTypes: {},
} as Meta;

const Template: Story<CalendarDateRowProps> = args => <CalendarDateRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  days: [
    { yyyymmdd: '2022-02-06', isThisMonth: true },
    { yyyymmdd: '2022-02-07', isThisMonth: true, accounts: fixtureAccounts },
    { yyyymmdd: '2022-02-08', isThisMonth: true },
    { yyyymmdd: '2022-02-09', isThisMonth: true },
    { yyyymmdd: '2022-02-10', isThisMonth: true, isToday: true },
    { yyyymmdd: '2022-02-11', isThisMonth: true },
    { yyyymmdd: '2022-02-12', isThisMonth: true },
  ],
};
