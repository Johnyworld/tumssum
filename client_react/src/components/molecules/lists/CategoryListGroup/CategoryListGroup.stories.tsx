import { Story, Meta } from '@storybook/react';
import { fixtureCategoryGroupA } from '~/fixtures/category.fixture';
import { tooLongText2 } from '~/fixtures/common';
import CategoryListGroup, { CategoryListGroupProps } from './CategoryListGroup';

export default {
  title: 'Molecules/Lists/CategoryListGroup',
  component: CategoryListGroup,
  argTypes: {},
} as Meta;

const Template: Story<CategoryListGroupProps> = args => <CategoryListGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  categoryGroup: fixtureCategoryGroupA,
};

export const CASE_TooLongTitle = Template.bind({});
CASE_TooLongTitle.args = {
  categoryGroup: { ...fixtureCategoryGroupA, title: tooLongText2 },
};

export const CASE_NoTitle = Template.bind({});
CASE_NoTitle.args = {
  categoryGroup: { ...fixtureCategoryGroupA, title: '' },
};

export const Case_NoItems = Template.bind({});
Case_NoItems.args = {
  categoryGroup: { ...fixtureCategoryGroupA, items: [] },
};
