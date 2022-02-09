import { Story, Meta } from '@storybook/react';
import { fixtureCategoryItemA } from '~/fixtures/category.fixture';
import { tooLongText2 } from '~/fixtures/common';
import CategoryListItem, { CategoryListItemProps } from './CategoryListItem';

export default {
  title: 'Molecules/Lists/CategoryListItem',
  component: CategoryListItem,
  argTypes: {},
} as Meta;

const Template: Story<CategoryListItemProps> = args => <CategoryListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: fixtureCategoryItemA,
};

export const TooLongTitleAndMemo = Template.bind({});
TooLongTitleAndMemo.args = {
  category: { ...fixtureCategoryItemA, title: tooLongText2, memo: tooLongText2 },
};
