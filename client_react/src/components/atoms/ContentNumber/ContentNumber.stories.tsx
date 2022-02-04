import { Story, Meta } from '@storybook/react';
import ContentNumber, { ContentNumberProps } from './ContentNumber';

export default {
  title: 'Atoms/ContentNumber',
  component: ContentNumber,
  argTypes: {},
} as Meta;

const Template: Story<ContentNumberProps> = (args) => <ContentNumber {...args} />;
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter a number',
};

export const Natural = Template.bind({});
Natural.args = {
  value: 'df123',
  placeholder: 'Enter a number',
  isNatural: true,
};

export const Label = Template.bind({});
Label.args = {
  placeholder: 'Enter a number',
  label: 'Label',
};
