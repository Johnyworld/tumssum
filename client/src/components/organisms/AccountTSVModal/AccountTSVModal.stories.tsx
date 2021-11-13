import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import AccountTSVModal, { AccountTSVModalProps } from './AccountTSVModal';

export default {
	title: 'Organisms/AccountTSVModal',
	component: AccountTSVModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<AccountTSVModalProps> = (args) => <AccountTSVModal {...args} />

export const Default = Template.bind({});
Default.args = {
	
};