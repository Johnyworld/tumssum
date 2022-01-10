import { Story, Meta } from '@storybook/react';
import NumberInput, { NumberInputProps } from './NumberInput';

export default {
	title: 'Molecules/Inputs/NumberInput',
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

