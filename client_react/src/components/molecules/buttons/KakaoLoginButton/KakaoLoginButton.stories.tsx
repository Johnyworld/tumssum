import { Story, Meta } from '@storybook/react';
import KakaoLoginButton, { KakaoLoginButtonProps } from './KakaoLoginButton';

export default {
	title: 'Molecules/Buttons/KakaoLoginButton',
	component: KakaoLoginButton,
	argTypes: {
		
	}
} as Meta;

const BUTTON_TEXT = '카카오 계정으로 계속하기';

const Template: Story<KakaoLoginButtonProps> = (args) => <KakaoLoginButton {...args} >{BUTTON_TEXT}</KakaoLoginButton>
export const Default = Template.bind({});
Default.args = {};

const TemplateFluid: Story<KakaoLoginButtonProps> = (args) => <KakaoLoginButton {...args}>{BUTTON_TEXT}</KakaoLoginButton>
export const Fluid = TemplateFluid.bind({});
Fluid.args = {
	fluid: true,
};

const TemplateNoText: Story<KakaoLoginButtonProps> = (args) => <KakaoLoginButton {...args} />
export const CASE_NoText = TemplateNoText.bind({});
CASE_NoText.args = {};

const TemplateTooLongText: Story<KakaoLoginButtonProps> = (args) => (
	<div style={{ width: '150px' }}>
		<KakaoLoginButton {...args}>The button with long text than container width</KakaoLoginButton>
	</div>
)
export const CASE_TooLongText = TemplateTooLongText.bind({});
CASE_TooLongText.args = {};
