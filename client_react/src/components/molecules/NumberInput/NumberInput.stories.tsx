import { Story, Meta } from '@storybook/react';
import NumberInput, { NumberInputProps } from './NumberInput';

export default {
	title: 'Molecules/NumberInput',
	component: NumberInput,
	argTypes: {
	
	}
} as Meta;

const Template: Story<NumberInputProps> = (args) => <NumberInput {...args} />
export const Default = Template.bind({});
Default.args = {
	min: 5,
	max: 10,
	label: 'Label',
	placeholder: 'Enter number...',
	fluid: false,
	readOnly: false,
	required: false,
	disabled: false,
};


const TemplateOverNumber: Story<NumberInputProps> = (args) => <NumberInput {...args} />
export const CASE_OverNumber = TemplateOverNumber.bind({});
CASE_OverNumber.args = {
	value: 15,
	min: 5,
	max: 10,
	errorMessage: 'Please enter a number under 10'
};


const TemplateUnderNumber: Story<NumberInputProps> = (args) => <NumberInput {...args} />
export const CASE_UnderNumber = TemplateUnderNumber.bind({});
CASE_UnderNumber.args = {
	value: 2,
	min: 5,
	max: 10,
	errorMessage: 'Please enter a number over 5'
};

