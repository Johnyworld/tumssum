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
	loading: false,	
};


const TemplateMessage: Story<LoginFormProps> = (args) => <LoginForm {...args} />
export const Message = TemplateMessage.bind({});
Message.args = {
	loading: false,	
	message: {
		color: 'red',
		text: '유저에게 메시지를 보여줍니다.'
	}
};
