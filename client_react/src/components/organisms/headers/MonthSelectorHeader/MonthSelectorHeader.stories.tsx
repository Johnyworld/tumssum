import { Story, Meta } from '@storybook/react';
import MonthSelectorHeader, { MonthSelectorHeaderProps } from './MonthSelectorHeader';

export default {
  title: 'Organisms/Headers/MonthSelectorHeader',
  component: MonthSelectorHeader,
  argTypes: {},
} as Meta;

const Template: Story<MonthSelectorHeaderProps> = args => <MonthSelectorHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  yyyymm: '2022-02',
};
