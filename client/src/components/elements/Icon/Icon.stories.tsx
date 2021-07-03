import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Icon, { IconProps, icons } from './Icon';

export default {
	title: 'Elements/Icon',
	component: Icon,
	argTypes: {
    as: { control: { type: 'select', options: icons }},
	}
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Default = Template.bind({});
Default.args = {
	as: 'home'	
};