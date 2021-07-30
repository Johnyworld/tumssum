import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import ContentEditable, { ContentEditableProps } from './ContentEditable';
import { Color } from 'types';
import { SIZES_ARRAY, WEIGHTS_ARRAY } from '~utils/constants';

export default {
	title: 'Elements/ContentEditable',
	component: ContentEditable,
	argTypes: {
    styleType: { control: { type: 'select', options: [ 'button', 'transparent' ] }},
    color: { control: { type: 'select', options: [ 'primary', 'pen', 'pencel' ] as Color[] }},
    size: { control: { type: 'select', options: SIZES_ARRAY }},
    weight: { control: { type: 'select', options: WEIGHTS_ARRAY }},
	}
} as Meta;

const Template: Story<ContentEditableProps> = (args) => <ContentEditable {...args} />

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Placeholder',
};
