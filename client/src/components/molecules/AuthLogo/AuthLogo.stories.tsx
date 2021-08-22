import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import AuthLogo from './AuthLogo';

export default {
	title: 'Items/AuthLogo',
	component: AuthLogo,
	argTypes: {
	
	}
} as Meta;

const Template: Story = (args) => <AuthLogo {...args} />

export const Default = Template.bind({});
Default.args = {
	
};