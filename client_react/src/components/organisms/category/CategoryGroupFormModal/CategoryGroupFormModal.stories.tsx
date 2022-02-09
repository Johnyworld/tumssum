import { Story, Meta } from '@storybook/react';
import CategoryGroupFormModal, { CategoryGroupFormModalProps } from './CategoryGroupFormModal';

export default {
  title: 'Organisms/Category/CategoryGroupFormModal',
  component: CategoryGroupFormModal,
  argTypes: {},
} as Meta;

const Template: Story<CategoryGroupFormModalProps> = args => <CategoryGroupFormModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
