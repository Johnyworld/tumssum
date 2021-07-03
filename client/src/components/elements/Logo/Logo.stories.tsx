import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Logo, { LogoProps } from './Logo';

export default {
	title: 'Elements/Logo',
	component: Logo,
	argTypes: {
	
	}
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />

export const Default = Template.bind({});
Default.args = {
	
};