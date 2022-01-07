import { Story, Meta } from '@storybook/react';
import TextInput, { TextInputProps } from './TextInput';

export default {
	title: 'Atoms/TextInput',
	component: TextInput,
	argTypes: {
	
	}
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />

export const Default = Template.bind({});
Default.args = {
	value: '',
	label: 'Label',
	placeholder: 'Enter text...',
	fluid: false,
	readOnly: false,
	required: false,
	disabled: false,
};