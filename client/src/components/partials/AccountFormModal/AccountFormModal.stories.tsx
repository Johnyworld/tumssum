import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import AccountFormModal, { AccountFormModalProps } from './AccountFormModal';

export default {
	title: 'Partials/AccountFormModal',
	component: AccountFormModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<AccountFormModalProps> = (args) => <AccountFormModal {...args} />

export const Default = Template.bind({});
Default.args = {
};