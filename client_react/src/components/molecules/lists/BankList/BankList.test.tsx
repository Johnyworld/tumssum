import { render, screen } from '@testing-library/react';
import { fixtureBankTree } from '~/fixtures/bank.fixture';
import BankList from '.';

/**
 * - [x] render a list of items
 * - [x] render a empty list
 */

test('render a list of items', () => {
  render(<BankList bankTree={fixtureBankTree} />);
  const groups = screen.getAllByRole('list');
  for (let i = 0; i < fixtureBankTree.length; i++) {
    expect(groups[i].childNodes.length).toEqual(fixtureBankTree[i].items.length || 1); // 1 => <p>비어있음</p>
  }
});

test('render a empty list', () => {
  render(<BankList bankTree={[]} />);
  expect(screen.getByText('뱅크가 없어요.')).toBeInTheDocument();
});
