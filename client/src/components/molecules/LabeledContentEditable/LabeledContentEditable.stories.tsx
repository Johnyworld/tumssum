import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import LabeledContentEditable, { LabeledContentEditableProps } from './LabeledContentEditable';

export default {
	title: 'Items/LabeledContentEditable',
	component: LabeledContentEditable,
	argTypes: {
	
	}
} as Meta;

const Template: Story<LabeledContentEditableProps> = (args) => <LabeledContentEditable {...args} />

export const Default = Template.bind({});
Default.args = {
	label: 'Label',
	placeholder: 'Placeholder',
};