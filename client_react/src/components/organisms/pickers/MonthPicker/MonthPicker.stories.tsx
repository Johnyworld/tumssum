import { Story, Meta } from '@storybook/react';
import MonthPicker, { MonthPickerProps } from './MonthPicker';

export default {
  title: 'Organisms/Pickers/MonthPicker',
  component: MonthPicker,
  argTypes: {},
} as Meta;

const Template: Story<MonthPickerProps> = args => <MonthPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  pos: { x: 0, y: 0 },
  yyyymm: '2022-02',
};
