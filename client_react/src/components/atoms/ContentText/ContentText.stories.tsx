import { Story, Meta } from '@storybook/react';
import ContentText, { ContentTextProps } from './ContentText';

export default {
  title: 'Atoms/ContentText',
  component: ContentText,
  argTypes: {},
} as Meta;

const Template: Story<ContentTextProps> = (args) => <ContentText {...args} />;
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter a text',
};
