import { Story, Meta } from '@storybook/react';
import LoginForm, { LoginFormProps, SendingStatus } from './LoginForm';

export default {
	title: 'Organisms/Auth/LoginForm',
	component: LoginForm,
	argTypes: {
    sendingStatus: { control: { type: 'select', options: ['SENDING', 'SENT'] as SendingStatus[] }},
	}
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />
export const Default = Template.bind({});
Default.args = {
};


const TemplateSending: Story<LoginFormProps> = (args) => <LoginForm {...args} />
export const SendingEmail = TemplateSending.bind({});
SendingEmail.args = {
	sendingStatus: 'SENDING',
};


const TemplateSent: Story<LoginFormProps> = (args) => <LoginForm {...args} />
export const SentEmail = TemplateSent.bind({});
SentEmail.args = {
	sendingStatus: 'SENT',
};


const TemplateError: Story<LoginFormProps> = (args) => <LoginForm {...args} />
export const _Error = TemplateError.bind({});
_Error.args = {
	sendingError: '인증 이메일을 보내는데 실패 했어요.',
};
