import { Story, Meta } from '@storybook/react';
import SocialLoginButtons, { SocialLoginButtonsProps } from './SocialLoginButtons';

export default {
	title: 'Organisms/Auth/SocialLoginButtons',
	component: SocialLoginButtons,
	argTypes: {
	
	}
} as Meta;

const Template: Story<SocialLoginButtonsProps> = (args) => <SocialLoginButtons {...args} />

export const Default = Template.bind({});
Default.args = {
	
};