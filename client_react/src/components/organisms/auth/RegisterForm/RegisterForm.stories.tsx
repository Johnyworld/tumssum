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