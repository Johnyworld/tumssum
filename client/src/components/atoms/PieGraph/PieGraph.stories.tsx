import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import PieGraph, { PieGraphProps } from './PieGraph';

export default {
	title: 'Atoms/PieGraph',
	component: PieGraph,
	argTypes: {
		
	}
} as Meta;

const Template: Story<PieGraphProps> = (args) => <PieGraph {...args} />

export const Default = Template.bind({});
Default.args = {
	
};