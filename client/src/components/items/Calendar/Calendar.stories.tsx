import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Calendar, { CalendarProps } from './Calendar';

export default {
	title: 'Elements/Calendar',
	component: Calendar,
	argTypes: {
		
	}
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />

export const Default = Template.bind({});
Default.args = {
	date: new Date().toISOString()
};