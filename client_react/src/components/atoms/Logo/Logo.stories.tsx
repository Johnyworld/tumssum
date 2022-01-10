import { Story, Meta } from '@storybook/react';
import { threeSizes } from '~/fixtures/common';
import Logo, { LogoProps } from './Logo';

export default {
	title: 'Atoms/Logo',
	component: Logo,
	argTypes: {
    size: { control: { type: 'select', options: threeSizes }},
	}
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />
export const Default = Template.bind({});
Default.args = {
};

const TemplateSizes: Story<LogoProps> = (args) => (
	<div>
		{ threeSizes.map((size, i) => (
			<>
				{ i !== 0 && <hr /> }
				<h6>{size}</h6>
				<Logo size={size} {...args} />
			</>
		))}
	</div>
)
export const Sizes = TemplateSizes.bind({});
Sizes.args = {
};