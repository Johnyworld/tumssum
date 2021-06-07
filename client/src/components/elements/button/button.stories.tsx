import { h } from 'preact';
import Button, { ButtonProps } from './button';
import { Story, Meta } from '@storybook/preact';
import { Color } from 'types';

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    color: { control: { type: 'select', options: [ 'primary', 'black' ] as Color[] }},
    type: { control: { type: 'select', options: [ 'button', 'submit' ] }},
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  fluid: false,
  children: '버튼',
  type: 'button',
  disabled: false,
};
