import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Divider, { DividerProps } from './Divider';

export default {
	title: 'Elements/Divider',
	component: Divider,
	argTypes: {
	
	}
} as Meta;

const Template: Story<DividerProps> = (args) => <Divider {...args} />

export const Default = Template.bind({});
Default.args = {
	text: 'Hello world!',	
};