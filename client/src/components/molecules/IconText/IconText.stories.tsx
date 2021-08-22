import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import IconText, { IconTextProps } from './IconText';
import { icons } from '~components/atoms/Icon/Icon';

export default {
	title: 'Items/IconText',
	component: IconText,
	argTypes: {
    icon: { control: { type: 'select', options: icons }},
	}
} as Meta;

const Template: Story<IconTextProps> = (args) => <IconText {...args} />

export const Default = Template.bind({});
Default.args = {
	icon: 'home',
	text: 'Home',
};