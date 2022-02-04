import { Story, Meta } from '@storybook/react';
import { selectList, selectListGroups, selectPlaceholder } from '~/fixtures/common';
import ContentDropdown, { ContentDropdownProps } from './ContentDropdown';

export default {
  title: 'Atoms/ContentDropdown',
  component: ContentDropdown,
  argTypes: {},
} as Meta;

const Template: Story<ContentDropdownProps> = (args) => <ContentDropdown {...args} />;
export const Default = Template.bind({});
Default.args = {
  list: selectList,
  placeholder: selectPlaceholder,
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  list: selectList,
  selected: 'banana',
  placeholder: selectPlaceholder,
};

export const ListWithGroups = Template.bind({});
ListWithGroups.args = {
  list: selectListGroups,
  placeholder: selectPlaceholder,
};

export const Label = Template.bind({});
Label.args = {
  list: selectListGroups,
  placeholder: selectPlaceholder,
  label: 'Label',
};
