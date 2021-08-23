import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import CategoryFormModal, { CategoryFormModalProps } from './CategoryFormModal';
import { Category } from 'types';

export default {
	title: 'Organisms/CategoryFormModal',
	component: CategoryFormModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<CategoryFormModalProps> = (args) => <CategoryFormModal {...args} />

export const Default = Template.bind({});
Default.args = {
	category: {
		id: 1,
		title: 'Category',
	}	as Category
};