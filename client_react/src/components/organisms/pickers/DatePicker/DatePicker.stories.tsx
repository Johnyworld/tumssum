import { Story, Meta } from '@storybook/react';
import DatePicker, { DatePickerProps } from './DatePicker';

export default {
  title: 'Organisms/Pickers/DatePicker',
  component: DatePicker,
  argTypes: {},
} as Meta;

const Template: Story<DatePickerProps> = args => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '2022-02-10',
  pos: { x: 0, y: 0 },
};
