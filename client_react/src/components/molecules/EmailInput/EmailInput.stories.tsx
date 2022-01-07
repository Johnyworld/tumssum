import { Story, Meta } from '@storybook/react';
import EmailInput, { EmailInputProps } from './EmailInput';

export default {
	title: 'Molecules/EmailInput',
	component: EmailInput,
	argTypes: {

	}
} as Meta;

const Template: Story<EmailInputProps> = (args) => <EmailInput {...args} />

export const Default = Template.bind({});
Default.args = {
	value: '',
	label: 'Label',
	placeholder: 'Enter email...',
	fluid: false,
	readOnly: false,
	required: false,
	disabled: false,
};