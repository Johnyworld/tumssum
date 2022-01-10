import { Story, Meta } from '@storybook/react';
import LogoSlogan, { LogoSloganProps } from './LogoSlogan';

export default {
	title: 'Molecules/Logos/LogoSlogan',
	component: LogoSlogan,
	argTypes: {
	
	}
} as Meta;

const Template: Story<LogoSloganProps> = (args) => <LogoSlogan {...args} />

export const Default = Template.bind({});
Default.args = {
	
};