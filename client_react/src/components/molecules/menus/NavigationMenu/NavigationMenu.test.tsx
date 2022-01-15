import { fireEvent, render, screen } from '@testing-library/react';
import { MenuItem } from 'types';
import { FixtureNavigationMenu, navigationMenu } from '~/fixtures/common';
import NavigationMenu from '.'

/**
 * ### Navigation Menu Test
 * 
 * - 리스트가 비어있을 때에는 아무것도 렌더하지 않습니다.
 * - 리스트를 렌더합니다.
 * - 각 아이템을 클릭합니다.
 */

test('renders an empty menu', () => {
	const menus: MenuItem<FixtureNavigationMenu>[] = [];
	const mockClick = jest.fn();
	render(<NavigationMenu menus={menus} onChange={mockClick} />);
	const menu = screen.getByRole('menubar');
	expect(menu.firstChild).toBeNull();
})

test('should render a list of items', () => {
	const menus: MenuItem<FixtureNavigationMenu>[] = navigationMenu;
	const mockClick = jest.fn();
	render(<NavigationMenu menus={menus} onChange={mockClick} />);
	const items = screen.getAllByRole('menuitem');
	expect(items.length).toEqual(menus.length);
	expect(items.map(item => item.textContent)).toEqual(menus.map(menu => menu.text));
})

test('it should perform the passed onClick function of each items', () => {
	const menus: MenuItem<FixtureNavigationMenu>[] = navigationMenu;
	const mockClick = jest.fn();
	render(<NavigationMenu menus={menus} onChange={mockClick} />);
	const items = screen.getAllByRole('menuitem');
	for (const item of items) {
		fireEvent.click(item);
	}
  expect(mockClick.mock.calls.length).toBe(menus.length);
})
