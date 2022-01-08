import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { buttonTypes, chromaticColors } from '~/fixtures/common';

export default {
	title: 'Atoms/Button',
	component: Button,
	argTypes: {
		color: { control: { type: 'select', options: chromaticColors }},
    type: { control: { type: 'select', options: buttonTypes }},
    onClick: { action: 'onClick' },	
	}
} as Meta;


const Template: Story<ButtonProps> = (args) => <Button {...args} >Button</Button>
export const Default = Template.bind({});
Default.args = {
  type: 'button',
  fluid: false,
  disabled: false,
};


const TemplateFluid: Story<ButtonProps> = (args) => <Button {...args} >Button</Button>
export const Fluid = TemplateFluid.bind({});
Fluid.args = { fluid: true };


const TemplateDisabled: Story<ButtonProps> = (args) => <Button {...args} >Button</Button>
export const Disabled = TemplateDisabled.bind({});
Disabled.args = { disabled: true };


const TemplateColors: Story<ButtonProps> = (args) => (
	<div>
		<h6>primary</h6>
		<Button color='primary' {...args} >Button</Button>
		<hr />
		<h6>red</h6>
		<Button color='red' {...args} >Button</Button>
		<hr />
		<h6>green</h6>
		<Button color='green' {...args} >Button</Button>
	</div>
)
export const Colors = TemplateColors.bind({});
Colors.args = {};


const TemplateSizes: Story<ButtonProps> = (args) => (
	<div>
		<h6>small</h6>
		<Button size='small' {...args} >Button</Button>
		<hr />
		<h6>regular</h6>
		<Button size='regular' {...args} >Button</Button>
		<hr />
		<h6>large</h6>
		<Button size='large' {...args} >Button</Button>
	</div>
)
export const Sizes = TemplateSizes.bind({});
Sizes.args = {};



const TemplateTextOverflow: Story<ButtonProps> = (args) => (
	<div style={{ width: '140px' }}>
		<Button {...args} >The button with long text than container width</Button>
	</div>
)
export const CASE_TextOverflow = TemplateTextOverflow.bind({ describe: 'dfdf'});
CASE_TextOverflow.args = { fluid: true }
