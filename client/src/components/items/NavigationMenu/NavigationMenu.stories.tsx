import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import NavigationMenu, { NavigationMenuProps } from './NavigationMenu';

export default {
	title: 'Items/NavigationMenu',
	component: NavigationMenu,
	argTypes: {
	
	}
} as Meta;

const Template: Story<NavigationMenuProps> = (args) => <NavigationMenu {...args} />

export const Default = Template.bind({});
Default.args = {
	list: [
		{ id: 'home', text: 'Home', icon: 'home' },
		{ id: 'budget', text: 'Budget', icon: 'home' },
	],
	selected: 'home',
};