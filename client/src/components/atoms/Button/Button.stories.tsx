import { h } from 'preact';
import Button, { ButtonProps } from './Button';
import { Story, Meta } from '@storybook/preact';
import { Color } from 'types';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: { control: { type: 'select', options: [ 'primary', 'black', 'gray' ] as Color[] }},
    size: { control: { type: 'select', options: [ 'small', 'regular', 'large' ] }},
    paddingX: { control: { type: 'select', options: [ 'narrow', 'normal', 'wide' ] }},
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
