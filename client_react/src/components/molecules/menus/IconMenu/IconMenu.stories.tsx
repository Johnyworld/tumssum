import { Story, Meta } from '@storybook/react';
import { fixtureIconMenus } from '~/fixtures/menus.fixture';
import IconMenu, { IconMenuProps } from './IconMenu';

export default {
  title: 'Molecules/Menus/IconMenu',
  component: IconMenu,
  argTypes: {},
} as Meta;

const Template: Story<IconMenuProps> = args => <IconMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  list: fixtureIconMenus,
};
