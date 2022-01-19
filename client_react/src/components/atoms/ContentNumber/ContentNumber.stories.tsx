import { Story, Meta } from '@storybook/react';
import ContentNumber, { ContentNumberProps } from './ContentNumber';

export default {
	title: 'Atoms/ContentNumber',
	component: ContentNumber,
	argTypes: {
	
	}
} as Meta;

const Template: Story<ContentNumberProps> = (args) => <ContentNumber {...args} />
export const Default = Template.bind({});
Default.args = {
	placeholder: 'Enter a number',
};

const TemplateNatural: Story<ContentNumberProps> = (args) => <ContentNumber {...args} />
export const Natural = TemplateNatural.bind({});
Natural.args = {
	value: 'df123',
	placeholder: 'Enter a number',
	isNatural: true,
};