import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
	title: 'Atoms/Input',
	component: Input,
	argTypes: {
	
	}
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />

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