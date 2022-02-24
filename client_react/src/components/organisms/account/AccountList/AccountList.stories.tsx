import { Story, Meta } from '@storybook/react';
import AccountList, { AccountListProps } from './AccountList';

export default {
  title: 'Atoms/AccountList',
  component: AccountList,
  argTypes: {},
} as Meta;

const Template: Story<AccountListProps> = args => <AccountList {...args} />;

export const Default = Template.bind({});
Default.args = {};
