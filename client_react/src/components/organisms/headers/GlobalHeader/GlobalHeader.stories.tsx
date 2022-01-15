import { Story, Meta } from '@storybook/react';
import GlobalHeader from './GlobalHeader';
import { MemoryRouter } from 'react-router-dom'

 
export default {
	title: 'Organisms/headers/GlobalHeader',
	component: GlobalHeader,
	argTypes: {
	
	}
} as Meta;

const Template: Story = (args) => <MemoryRouter><GlobalHeader {...args} /></MemoryRouter>
export const Default = Template.bind({});
Default.args = {
	
};