import { Story, Meta } from '@storybook/react';
import { tooLongText1 } from '~/fixtures/common';
import Toast, { ToastProps } from './Toast';

export default {
	title: 'Organisms/Modals/Toast',
	component: Toast,
	argTypes: {
	
	}
} as Meta;

const Template: Story<ToastProps> = (args) => <Toast {...args} />
export const Default = Template.bind({});
Default.args = {
	toast: { id: 1, index: 0, message: '토스트 입니다.', color: 'green' },
};

const TemplateNoMessage: Story<ToastProps> = (args) => <Toast {...args} />
export const CASE_NoMessage = TemplateNoMessage.bind({});
CASE_NoMessage.args = {
	toast: { id: 1, index: 0, message: '', color: 'green' },
};

const TemplateTooLongMessage: Story<ToastProps> = (args) => <Toast {...args} />
export const CASE_TooLongMessage = TemplateTooLongMessage.bind({});
CASE_TooLongMessage.args = {
	toast: { id: 1, index: 0, message: tooLongText1, color: 'green' },
};
