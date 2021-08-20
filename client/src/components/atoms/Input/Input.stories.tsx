import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Input, { InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'onChange' },
    type: { control: { type: 'select', options: [ 'text', 'number', 'email', 'password' ]}},
  },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} ></Input>;

export const Primary = Template.bind({});
Primary.args = {
	name: 'name',
	label: 'Name',
	value: '',
	placeholder: 'Please enter your name',
	fluid: false,
	required: false,
	readOnly: false,
};
