import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Icon, { IconProps, icons } from './Icon';
import { Color } from 'types';

export default {
	title: 'Elements/Icon',
	component: Icon,
	argTypes: {
    as: { control: { type: 'select', options: icons }},
    size: { control: { type: 'select', options: [ 'regular', 'medium' ] }},
    color: { control: { type: 'select', options: [ 'primary', 'black', 'gray' ] as Color[] }},
	}
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Default = Template.bind({});
Default.args = {
	as: 'home',
	size: 'regular',
	strokeWidth: 1,
};