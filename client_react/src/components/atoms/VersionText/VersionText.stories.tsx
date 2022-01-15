import { Story, Meta } from '@storybook/react';
import VersionText from './VersionText';

export default {
	title: 'Atoms/VersionText',
	component: VersionText,
	argTypes: {
	
	}
} as Meta;

const Template: Story = (args) => <VersionText {...args} />
export const Default = Template.bind({});
Default.args = {
	
};