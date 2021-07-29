import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import CreateAccountModal, { CreateAccountModalProps } from './CreateAccountModal';

export default {
	title: 'Patials/CreateAccountModal',
	component: CreateAccountModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<CreateAccountModalProps> = (args) => <CreateAccountModal {...args} />

export const Default = Template.bind({});
Default.args = {
};