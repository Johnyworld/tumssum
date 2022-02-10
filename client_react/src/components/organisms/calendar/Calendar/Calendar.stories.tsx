import { Story, Meta } from '@storybook/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import Calendar, { CalendarProps } from './Calendar';

export default {
  title: 'Organisms/Calendar/Calendar',
  component: Calendar,
  argTypes: {},
} as Meta;

const Template: Story<CalendarProps> = args => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  weeks: [
    [
      { yyyymmdd: '2022-01-30' },
      { yyyymmdd: '2022-01-31' },
      { yyyymmdd: '2022-02-01', isThisMonth: true },
      { yyyymmdd: '2022-02-02', isThisMonth: true },
      { yyyymmdd: '2022-02-03', isThisMonth: true },
      { yyyymmdd: '2022-02-04', isThisMonth: true },
      { yyyymmdd: '2022-02-05', isThisMonth: true },
    ],
    [
      { yyyymmdd: '2022-02-06', isThisMonth: true },
      { yyyymmdd: '2022-02-07', isThisMonth: true, accounts: fixtureAccounts },
      { yyyymmdd: '2022-02-08', isThisMonth: true },
      { yyyymmdd: '2022-02-09', isThisMonth: true },
      { yyyymmdd: '2022-02-10', isThisMonth: true, isToday: true },
      { yyyymmdd: '2022-02-11', isThisMonth: true },
      { yyyymmdd: '2022-02-12', isThisMonth: true },
    ],
    [
      { yyyymmdd: '2022-02-13', isThisMonth: true },
      { yyyymmdd: '2022-02-14', isThisMonth: true },
      { yyyymmdd: '2022-02-15', isThisMonth: true },
      { yyyymmdd: '2022-02-16', isThisMonth: true },
      { yyyymmdd: '2022-02-17', isThisMonth: true },
      { yyyymmdd: '2022-02-18', isThisMonth: true },
      { yyyymmdd: '2022-02-19', isThisMonth: true },
    ],
    [
      { yyyymmdd: '2022-02-20', isThisMonth: true },
      { yyyymmdd: '2022-02-21', isThisMonth: true },
      { yyyymmdd: '2022-02-22', isThisMonth: true },
      { yyyymmdd: '2022-02-23', isThisMonth: true },
      { yyyymmdd: '2022-02-24', isThisMonth: true },
      { yyyymmdd: '2022-02-25', isThisMonth: true },
      { yyyymmdd: '2022-02-26', isThisMonth: true },
    ],
    [
      { yyyymmdd: '2022-02-27', isThisMonth: true },
      { yyyymmdd: '2022-02-28', isThisMonth: true },
      { yyyymmdd: '2022-03-01' },
      { yyyymmdd: '2022-03-02' },
      { yyyymmdd: '2022-03-03' },
      { yyyymmdd: '2022-03-04' },
      { yyyymmdd: '2022-03-05' },
    ],
  ],
};
