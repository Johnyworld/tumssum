import { render, screen } from '@testing-library/react';
import { fixtureBankTree } from '~/fixtures/bank.fixture';
import { fixtureCategoryTree } from '~/fixtures/category.fixture';
import CategoryList from './CategoryList';

/**
 * - [x] render a list of items
 * - [x] render a empty list
 */

test('render a list of items', () => {
  render(<CategoryList categoryTree={fixtureCategoryTree} />);
  const groups = screen.getAllByRole('list');
  for (let i = 0; i < fixtureBankTree.length; i++) {
    expect(groups[i].childNodes.length).toEqual(fixtureBankTree[i].items?.length || 1); // 1 => <p>비어있음</p>
  }
});

test('render a empty list', () => {
  render(<CategoryList categoryTree={[]} />);
  expect(screen.getByText('카테고리가 없어요.')).toBeInTheDocument();
});
