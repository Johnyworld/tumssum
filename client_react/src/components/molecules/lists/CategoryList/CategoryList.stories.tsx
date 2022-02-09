import { Story, Meta } from '@storybook/react';
import { fixtureCategoryTree } from '~/fixtures/category.fixture';
import CategoryList, { CategoryListProps } from './CategoryList';

export default {
  title: 'Molecules/Lists/CategoryList',
  component: CategoryList,
  argTypes: {},
} as Meta;

const Template: Story<CategoryListProps> = args => <CategoryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  categoryTree: fixtureCategoryTree,
};
