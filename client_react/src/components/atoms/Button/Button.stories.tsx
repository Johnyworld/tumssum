import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { buttonTypes, chromaticColors, threeSizes } from '~/fixtures/common';

export default {
	title: 'Atoms/Button',
	component: Button,
	argTypes: {
		color: { control: { type: 'select', options: chromaticColors }},
    type: { control: { type: 'select', options: buttonTypes }},
    size: { control: { type: 'select', options: threeSizes }},
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
	 	{ chromaticColors.map((color, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6>{color}</h6>
				<Button color={color} {...args} >Button</Button>
			</>
		))}
	</div>
)
export const Colors = TemplateColors.bind({});
Colors.args = {};


const TemplateSizes: Story<ButtonProps> = (args) => (
	<div>
		{ threeSizes.map((size, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6>{size}</h6>
				<Button size={size} {...args} >Button</Button>
			</>
		))}
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
CASE_TextOverflow.parameters = { docs: { storyDescription: '버튼 내부의 텍스트가 2줄이 넘어가면 말줄임표로 처리합니다.' }}
CASE_TextOverflow.args = { fluid: true }
