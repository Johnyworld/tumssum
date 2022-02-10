import { Story, Meta } from '@storybook/react';
import { fixtureAccountA, fixtureAccountC } from '~/fixtures/account.fixture';
import { tooLongText2 } from '~/fixtures/common';
import CalendarAccountItem, { CalendarAccountItemProps } from './CalendarAccountItem';

export default {
  title: 'Organisms/Calendar/CalendarAccountItem',
  component: CalendarAccountItem,
  argTypes: {},
} as Meta;

const Template: Story<CalendarAccountItemProps> = args => <CalendarAccountItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  account: fixtureAccountA,
};

export const CASE_NoTitle = Template.bind({});
CASE_NoTitle.args = {
  account: fixtureAccountC,
};

export const CASE_TooLongTitleAndMemo = Template.bind({});
CASE_TooLongTitleAndMemo.args = {
  account: {
    ...fixtureAccountA,
    title: tooLongText2,
    memo: tooLongText2,
  },
};
