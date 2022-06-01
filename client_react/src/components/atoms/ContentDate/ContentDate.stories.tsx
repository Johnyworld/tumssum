import { Story, Meta } from '@storybook/react';
import ContentDate, { ContentDateProps } from './ContentDate';

export default {
  title: 'Atoms/ContentDate',
  component: ContentDate,
  argTypes: {},
} as Meta;

const Template: Story<ContentDateProps> = args => <ContentDate {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '2022-02-10',
  label: 'Label',
};
