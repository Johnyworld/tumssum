import { Story, Meta } from '@storybook/react';
import ContentTextarea, { ContentTextareaProps } from './ContentTextarea';

export default {
  title: 'Atoms/ContentTextarea',
  component: ContentTextarea,
  argTypes: {},
} as Meta;

const Template: Story<ContentTextareaProps> = (args) => <ContentTextarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter a text',
};
