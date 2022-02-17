import { Story, Meta } from '@storybook/react';
import ContentTime, { ContentTimeProps } from './ContentTime';

export default {
  title: 'Atoms/ContentTime',
  component: ContentTime,
  argTypes: {},
} as Meta;

const Template: Story<ContentTimeProps> = args => <ContentTime {...args} />;

export const Default = Template.bind({});
Default.args = {
  time: '14:20:22.333z',
  label: 'Label',
};
