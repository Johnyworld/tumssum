import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Selector, { SelectorProps } from './Selector';

export default {
	title: 'Elements/Selector',
	component: Selector,
	argTypes: {
		
	}
} as Meta;

const Template: Story<SelectorProps> = (args) => <Selector {...args} />

export const Default = Template.bind({});
Default.args = {
	list: [
		{ id: '1', text: 'Item 1' },
		{ id: '2', text: 'Item 2' },
	],
	selected: '1',
	label: 'Label',
	fluid: false,
};