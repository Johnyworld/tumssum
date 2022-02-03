import { Story, Meta } from '@storybook/react';
import {
  selectList,
  selectListGroups,
  selectPlaceholder,
} from '~/fixtures/common';
import ContentDropdown, { ContentDropdownProps } from './ContentDropdown';

export default {
  title: 'Atoms/ContentDropdown',
  component: ContentDropdown,
  argTypes: {},
} as Meta;

const Template: Story<ContentDropdownProps> = (args) => (
  <ContentDropdown {...args} />
);
export const Default = Template.bind({});
Default.args = {
  list: selectList,
  placeholder: selectPlaceholder,
};

const TemplateDefaultValue: Story<ContentDropdownProps> = (args) => (
  <ContentDropdown {...args} />
);
export const DefaultValue = TemplateDefaultValue.bind({});
DefaultValue.args = {
  list: selectList,
  selected: 'banana',
  placeholder: selectPlaceholder,
};

const TemplateListWithGroups: Story<ContentDropdownProps> = (args) => (
  <ContentDropdown {...args} />
);
export const ListWithGroups = TemplateListWithGroups.bind({});
ListWithGroups.args = {
  list: selectListGroups,
  placeholder: selectPlaceholder,
};
