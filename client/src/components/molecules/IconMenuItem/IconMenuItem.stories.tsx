import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import IconMenuItem, { IconMenuItemProps } from './IconMenuItem';
import { icons } from '~components/atoms/Icon/Icon';

export default {
	title: 'Molecules/IconMenuItem',
	component: IconMenuItem,
	argTypes: {
    icon: { control: { type: 'select', options: icons }},
	}
} as Meta;

const Template: Story<IconMenuItemProps> = (args) => <IconMenuItem {...args} />

export const Default = Template.bind({});
Default.args = {
	icon: 'calendar',
	text: 'Calendar',
	isSelected: true,
};