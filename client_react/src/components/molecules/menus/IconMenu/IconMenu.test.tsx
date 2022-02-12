import { render, screen } from '@testing-library/react';
import { fixtureIconMenus } from '~/fixtures/menus.fixture';
import IconMenu from '.';

test('renders list items', () => {
  render(<IconMenu list={fixtureIconMenus} />);
  expect(screen.getByRole('list').childNodes.length).toEqual(2);
});
