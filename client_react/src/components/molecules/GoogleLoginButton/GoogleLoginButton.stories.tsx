import { Story, Meta } from '@storybook/react';
import GoogleLoginButton, { GoogleLoginButtonProps } from './GoogleLoginButton';

export default {
	title: 'Molecules/GoogleLoginButton',
	component: GoogleLoginButton,
	argTypes: {
	
	}
} as Meta;

const BUTTON_TEXT = '구글 계정으로 계속하기';

const Template: Story<GoogleLoginButtonProps> = (args) => <GoogleLoginButton {...args}>{BUTTON_TEXT}</GoogleLoginButton>
export const Default = Template.bind({});
Default.args = {};

const TemplateFluid: Story<GoogleLoginButtonProps> = (args) => <GoogleLoginButton {...args}>{BUTTON_TEXT}</GoogleLoginButton>
export const Fluid = TemplateFluid.bind({});
Fluid.args = {
	fluid: true,
};

const TemplateNoText: Story<GoogleLoginButtonProps> = (args) => <GoogleLoginButton {...args} />
export const CASE_NoText = TemplateNoText.bind({});
CASE_NoText.args = {};

const TemplateTooLongText: Story<GoogleLoginButtonProps> = (args) => (
	<div style={{ width: '150px' }}>
		<GoogleLoginButton {...args}>The button with long text than container width</GoogleLoginButton>
	</div>
)
export const CASE_TooLongText = TemplateTooLongText.bind({});
CASE_TooLongText.args = {};
