import { h } from 'preact';
import Button, { ButtonProps } from './button';
import { Story, Meta } from '@storybook/preact';

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: '버튼',
  color: 'pen',
};
