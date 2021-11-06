import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import IconText, { IconTextProps } from './IconText';
import { icons } from '~components/atoms/Icon/Icon';
import { Color } from 'types';

export default {
	title: 'Items/IconText',
	component: IconText,
	argTypes: {
    icon: { control: { type: 'select', options: icons }},
    direction: { control: { type: 'select', options: [ 'row', 'column' ] }},
    color: { control: { type: 'select', options: [ 'primary', 'black', 'gray' ] as Color[] }},
	}
} as Meta;

const Template: Story<IconTextProps> = (args) => <IconText {...args} />

export const Default = Template.bind({});
Default.args = {
	icon: 'home',
	text: 'Home',
};