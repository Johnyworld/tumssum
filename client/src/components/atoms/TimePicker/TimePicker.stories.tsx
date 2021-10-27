import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import TimePicker, { TimePickerProps } from './TimePicker';

export default {
	title: 'Organisms/TimePicker',
	component: TimePicker,
	argTypes: {
	
	}
} as Meta;

const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} />

export const Default = Template.bind({});
Default.args = {
	label: '',
	time: '22:00'
};
