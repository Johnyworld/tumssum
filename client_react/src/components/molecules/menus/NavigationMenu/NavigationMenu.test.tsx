import { render, screen } from '@testing-library/react';
import { MenuItem } from 'types';
import { navigationMenu } from '~/fixtures/common';
import NavigationMenu from '.';

/**
 * ### Navigation Menu Test
 *
 * - 리스트가 비어있을 때에는 아무것도 렌더하지 않습니다.
 * - 리스트를 렌더합니다.
 * - 각 아이템을 클릭합니다.
 */

test('renders an empty menu', () => {
  const menu: MenuItem[] = [];
  render(<NavigationMenu menu={menu} />);
  const menubar = screen.getByRole('menubar');
  expect(menubar.firstChild).toBeNull();
});

test('should render a list of items', () => {
  const menu: MenuItem[] = navigationMenu;
  render(<NavigationMenu menu={menu} />);
  const items = screen.getAllByRole('menuitem');
  expect(items.length).toEqual(menu.length);
  expect(items.map((item) => item.textContent)).toEqual(
    menu.map((item) => item.text)
  );
});
