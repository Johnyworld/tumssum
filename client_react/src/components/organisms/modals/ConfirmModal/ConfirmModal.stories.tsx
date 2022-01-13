import { Story, Meta } from '@storybook/react';
import { tooLongText2 } from '~/fixtures/common';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

export default {
	title: 'Organisms/Modals/ConfirmModal',
	component: ConfirmModal,
	argTypes: {
	
	}
} as Meta;

const Template: Story<ConfirmModalProps> = (args) => <ConfirmModal {...args} />
export const Default = Template.bind({});
Default.args = {
	message: '정말 삭제할까요?'	
};

const TemplateNoMessage: Story<ConfirmModalProps> = (args) => <ConfirmModal {...args} />
export const CASE_NoMessage = TemplateNoMessage.bind({});
CASE_NoMessage.args = {
};

const TemplateTooLongMessage: Story<ConfirmModalProps> = (args) => <ConfirmModal {...args} />
export const CASE_TooLongMessage = TemplateTooLongMessage.bind({});
CASE_TooLongMessage.args = {
	message: tooLongText2,
};
