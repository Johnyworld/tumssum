import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import DragDropUploader, { DragDropUploaderProps } from './DragDropUploader';

export default {
	title: 'Organisms/DragDropUploader',
	component: DragDropUploader,
	argTypes: {
	
	}
} as Meta;

const Template: Story<DragDropUploaderProps> = (args) => <DragDropUploader {...args} />

export const Default = Template.bind({});
Default.args = {
	
};