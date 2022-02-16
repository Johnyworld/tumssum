import { Story, Meta } from '@storybook/react';
import TimePicker, { TimePickerProps } from './TimePicker';

export default {
  title: 'Organisms/Pickers/TimePicker',
  component: TimePicker,
  argTypes: {},
} as Meta;

const Template: Story<TimePickerProps> = args => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  time: '17:00:22.000z',
  pos: { x: 0, y: 0 },
};
