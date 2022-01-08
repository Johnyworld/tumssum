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
	label: 'Label',
	placeholder: 'error',
	error: true,
};

const TemplateErrorWithMessage: Story<InputProps> = (args) => <Input {...args} />
export const _ErrorWithMessage = TemplateErrorWithMessage.bind({});
_ErrorWithMessage.args = {
	label: 'Label',
	placeholder: 'error',
	error: true,
	errorMessage: 'This is error message!'
};

const TemplateTooLongLabel: Story<InputProps> = (args) => <Input {...args} />
export const CASE_TooLongLabel = TemplateTooLongLabel.bind({});
CASE_TooLongLabel.parameters = { docs: { storyDescription: '라벨은 1줄을 차지합니다. 길이가 넘어가면 말줄임표로 처리합니다.' }}
CASE_TooLongLabel.args = {
	label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a libero nec mauris sagittis iaculis at ac turpis.',
};

const TemplateTooLongErrorMessage: Story<InputProps> = (args) => <Input {...args} />
export const CASE_TooLongErrorMessage = TemplateTooLongErrorMessage.bind({});
CASE_TooLongErrorMessage.parameters = { docs: { storyDescription: '에러 메시지는 2줄이 넘어가면 말줄임표로 처리합니다.' }}
CASE_TooLongErrorMessage.args = {
	label: 'Label',
	placeholder: 'error',
	error: true,
	errorMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a libero nec mauris sagittis iaculis at ac turpis.',
};
