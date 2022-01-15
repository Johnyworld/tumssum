import { Story, Meta } from '@storybook/react';
import { aLotOfNavigationMenu, FixtureALotOfNavigationMenu, FixtureNavigationMenu, navigationMenu } from '~/fixtures/common';
import NavigationMenu, { NavigationMenuProps } from './NavigationMenu';

export default {
	title: 'Molecules/Menus/NavigationMenu',
	component: NavigationMenu,
	argTypes: {
	
	}
} as Meta;

const Template: Story<NavigationMenuProps<FixtureNavigationMenu>> = (args) => <NavigationMenu {...args} />
export const Default = Template.bind({});
Default.args = {
	selected: 'home',
	menus: navigationMenu,	
};

const TemplateNeverBreak: Story<NavigationMenuProps<FixtureALotOfNavigationMenu>> = (args) => <NavigationMenu {...args} />
export const CASE_NeverBreak = TemplateNeverBreak.bind({});
CASE_NeverBreak.parameters = { docs: { storyDescription: '메뉴가 컨테이너의 너비보다 길어지면, 오버플로우 된 부분은 그냥 가립니다. 따라서 네비게이션 메뉴는 여유로는 공간에 배치하고, 필요한 경우에는 햄버거 메뉴 등의 처리를 해야합니다.' }}
CASE_NeverBreak.args = {
	selected: 'home',
	menus: aLotOfNavigationMenu,	
};