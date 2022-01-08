import { Story, Meta } from '@storybook/react';
import Icon, { IconProps, icons } from './Icon';
import { allColors, strokeWidths, threeSizes } from '~/fixtures/common';


export default {
	title: 'Atoms/Icon',
	component: Icon,
	argTypes: {
    as: { control: { type: 'select', options: icons }},
    size: {
			description: '`ThreeSizes`',
			control: { type: 'select', options: threeSizes }
		},
    color: {
			description: '`Colors`',
			control: { type: 'select', options: allColors }
		},
		strokeWidth: {
			description: '`StrokeWidth`',
			control: { type: 'select', options: strokeWidths }
		}
	},
} as Meta;


const Template: Story<IconProps> = (args) => <Icon {...args} />
export const Default = Template.bind({});
Default.args = {
	as: 'home',
	size: 'regular',
};


const TemplateSizes: Story<IconProps> = (args) => (
	<div>
	 	{ threeSizes.map((size, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6 style={{ marginBottom: '4px' }}>{size}</h6>
				<Icon size={size} {...args} />
			</>
		))}
	</div>
)
export const Sizes = TemplateSizes.bind({});
Sizes.args = { as: 'home' }


const TemplateStrokeWidth: Story<IconProps> = (args) => (
	<div>
	 	{ strokeWidths.map((width, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6 style={{ marginBottom: '4px' }}>{width}</h6>
				<Icon strokeWidth={width} {...args} />
			</>
		))}
	</div>
)
export const StrokeWidth = TemplateStrokeWidth.bind({});
StrokeWidth.args = { as: 'home' }


const TemplateColor: Story<IconProps> = (args) => (
	<div>
	 	{ allColors.map((color, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6 style={{ marginBottom: '4px' }}>{color}</h6>
				<Icon color={color} {...args} />
			</>
		))}
	</div>
)
export const IconColors = TemplateColor.bind({});
IconColors.args = { as: 'home' }


const TemplateIconList: Story<IconProps> = (args) => (
	<div style={{ display: 'grid', gap: '4rem 0', gridTemplateColumns: 'repeat(4, 1fr)' }}>
		{ icons.map(icon => (
			<div style={{ textAlign: 'center' }}>
				<Icon {...args} as={icon} />
				<p style={{ marginTop: '4px' }} className='f-tiny'>{icon}</p>
			</div>
		))}
	</div>
)
export const IconList = TemplateIconList.bind({});
IconList.args = {}
