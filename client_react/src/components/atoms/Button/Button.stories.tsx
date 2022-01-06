import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { buttonTypes, chromaticColors } from '~/fixtures/common';

export default {
	title: 'Atoms/Button',
	component: Button,
	argTypes: {
		color: { control: { type: 'select', options: chromaticColors }},
    type: { control: { type: 'select', options: buttonTypes }},
    onClick: { action: 'onClick' },	
	}
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  fluid: false,
  disabled: false,
};