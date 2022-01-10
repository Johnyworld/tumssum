import { Story, Meta } from '@storybook/react';
import KakaoLoginButton, { KakaoLoginButtonProps } from './KakaoLoginButton';

export default {
	title: 'Molecules/KakaoLoginButton',
	component: KakaoLoginButton,
	argTypes: {
		
	}
} as Meta;

const Template: Story<KakaoLoginButtonProps> = (args) => <KakaoLoginButton {...args} >카카오 계정으로 계속</KakaoLoginButton>
export const Default = Template.bind({});
Default.args = {};

const TemplateNoText: Story<KakaoLoginButtonProps> = (args) => <KakaoLoginButton {...args} />
export const NoText = TemplateNoText.bind({});
NoText.args = {};