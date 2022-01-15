import { Story, Meta } from '@storybook/react';
import IconArea, { IconAreaProps } from './IconArea';

export default {
	title: 'Molecules/Icons/IconArea',
	component: IconArea,
	argTypes: {
	
	}
} as Meta;

const Template: Story<IconAreaProps> = (args) => <IconArea style={{ border: '1px solid lightgray' }} {...args} />
export const Default = Template.bind({});
Default.args = {
	as: 'gear',
};