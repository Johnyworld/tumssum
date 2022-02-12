import { Story, Meta } from '@storybook/react';
import { tooLongText1 } from '~/fixtures/common';
import IconMenuItem, { IconMenuItemProps } from './IconMenuItem';

export default {
  title: 'Molecules/Menus/IconMenuItem',
  component: IconMenuItem,
  argTypes: {},
} as Meta;

const Template: Story<IconMenuItemProps> = args => <IconMenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'calendar',
  text: '캘린더',
};

export const CASE_TooLongText = Template.bind({});
CASE_TooLongText.args = {
  icon: 'calendar',
  text: tooLongText1,
};
