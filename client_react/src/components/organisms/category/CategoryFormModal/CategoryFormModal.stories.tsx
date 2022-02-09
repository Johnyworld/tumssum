import { Story, Meta } from '@storybook/react';
import { fixtureCategoryGroupA, fixtureCategoryGroupB } from '~/fixtures/category.fixture';
import CategoryFormModal, { CategoryFormModalProps } from './CategoryFormModal';

export default {
  title: 'Organisms/Category/CategoryFormModal',
  component: CategoryFormModal,
  argTypes: {},
} as Meta;

const Template: Story<CategoryFormModalProps> = args => <CategoryFormModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  groupList: [fixtureCategoryGroupA, fixtureCategoryGroupB],
};
