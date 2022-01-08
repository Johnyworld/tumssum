import { Story, Meta } from '@storybook/react';
import LinkTo, { LinkToProps } from './LinkTo';

export default {
	title: 'Atoms/LinkTo',
	component: LinkTo,
	argTypes: {
	
	}
} as Meta;

const Template: Story<LinkToProps> = (args) => <LinkTo {...args}>Go to naver.com</LinkTo>

export const Default = Template.bind({});
Default.args = {
	to: 'https://naver.com',
};


export const Underline = Template.bind({});
Underline.args = {
	to: 'https://naver.com',
	underline: true,
};
