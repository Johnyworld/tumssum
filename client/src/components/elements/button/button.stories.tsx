import { h } from 'preact';
import Button, { ButtonProps } from './Button';
import { Story, Meta } from '@storybook/preact';
import { Color } from 'types';

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    color: { control: { type: 'select', options: [ 'primary', 'black' ] as Color[] }},
    size: { control: { type: 'select', options: [ 'regular', 'large' ] }},
    type: { control: { type: 'select', options: [ 'button', 'submit' ] }},
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'button',
  children: 'Button',
  fluid: false,
  disabled: false,
};
