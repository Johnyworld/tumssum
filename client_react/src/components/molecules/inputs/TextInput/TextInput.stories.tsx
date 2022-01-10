import { Story, Meta } from '@storybook/react';
import TextInput, { TextInputProps } from './TextInput';

export default {
	title: 'Molecules/Inputs/TextInput',
	component: TextInput,
	argTypes: {
	
	}
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />

export const Default = Template.bind({});
Default.args = {
	value: '',
	minLength: 5,
	maxLength: 10,
	label: 'Label',
	placeholder: 'Enter text...',
	fluid: false,
	readOnly: false,
	required: false,
	disabled: false,
};