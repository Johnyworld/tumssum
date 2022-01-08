import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
	title: 'Atoms/Input',
	component: Input,
	argTypes: {
	
	}
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />
export const Default = Template.bind({});
Default.args = {
	label: 'Label',
	placeholder: 'Enter text...',
	fluid: false,
	readOnly: false,
	required: false,
	disabled: false,	
};


const TemplateLabel: Story<InputProps> = (args) => <Input {...args} />
export const Label = TemplateLabel.bind({});
Label.args = {
	label: 'Label',
};

const TemplatePlaceholder: Story<InputProps> = (args) => <Input {...args} />
export const Placeholder = TemplatePlaceholder.bind({});
Placeholder.args = {
	placeholder: 'Enter text...',
};

const TemplateFluid: Story<InputProps> = (args) => <Input {...args} />
export const Fluid = TemplateFluid.bind({});
Fluid.args = {
	placeholder: 'fluid',
	fluid: true,
};

const TemplateReadOnly: Story<InputProps> = (args) => <Input {...args} />
export const ReadOnly = TemplateReadOnly.bind({});
ReadOnly.args = {
	placeholder: 'readOnly',
	readOnly: true,
};

const TemplateRequired: Story<InputProps> = (args) => <Input {...args} />
export const Required = TemplateRequired.bind({});
Required.args = {
	placeholder: 'required',
	required: true,
};

const TemplateDisabled: Story<InputProps> = (args) => <Input {...args} />
export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
	placeholder: 'disabled',
	disabled: true,
};

const TemplateError: Story<InputProps> = (args) => <Input {...args} />
export const _Error = TemplateError.bind({});
_Error.args = {
	placeholder: 'error',
	error: true,
};
