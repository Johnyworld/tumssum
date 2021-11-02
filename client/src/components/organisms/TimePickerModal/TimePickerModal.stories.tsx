import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import TimePickerModal, { TimePickerModalProps } from './TimePickerModal';

export default {
	title: 'Organisms/TimePickerModal',
	component: TimePickerModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<TimePickerModalProps> = (args) => <TimePickerModal {...args} />

export const Default = Template.bind({});
Default.args = {
	time: '17:00',
	pos: {x: 400, y: 400},
};