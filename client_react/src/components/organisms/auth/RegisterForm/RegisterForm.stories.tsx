import { Story, Meta } from '@storybook/react';
import RegisterForm, { RegisterFormProps } from './RegisterForm';

export default {
	title: 'Organisms/Auth/RegisterForm',
	component: RegisterForm,
	argTypes: {
	
	}
} as Meta;

const Template: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />

export const Default = Template.bind({});
Default.args = {
	loading: false,	
};

const TemplateMessage: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />
export const Message = TemplateMessage.bind({});
Message.args = {
	loading: false,	
	message: {
		color: 'red',
		text: '유저에게 메시지를 보여줍니다.'
	}
};
