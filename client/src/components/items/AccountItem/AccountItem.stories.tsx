import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import AccountItem, { AccountItemProps } from './AccountItem';

export default {
	title: 'Items/AccountItem',
	component: AccountItem,
	argTypes: {
	
	}
} as Meta;

const Template: Story<AccountItemProps> = (args) => <AccountItem {...args} />

export const Default = Template.bind({});
Default.args = {
	title: 'Lorem Ipsum',
	amount: -5000,
};