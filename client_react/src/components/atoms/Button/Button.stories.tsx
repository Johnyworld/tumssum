import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
	title: 'elements/Button',
	component: Button,
	argTypes: {
	
	}
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({});
Default.args = {
	
};