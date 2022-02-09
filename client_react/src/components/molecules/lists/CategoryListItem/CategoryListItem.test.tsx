import { render, screen } from '@testing-library/react';
import { fixtureCategoryItemA } from '~/fixtures/category.fixture';
import numberUtil from '~/utils/numberUtil';
import CategoryListItem from './CategoryListItem';
/**
 * - [x] render a listitem
 * - [x] render a empty title
 */

test('render a listitem', () => {
  render(<CategoryListItem category={fixtureCategoryItemA} />);
  expect(screen.getByText(fixtureCategoryItemA.title)).toBeInTheDocument();
  expect(screen.getByText(fixtureCategoryItemA.memo!)).toBeInTheDocument();
  expect(screen.getByText(numberUtil.getComma(fixtureCategoryItemA.budget || 0))).toBeInTheDocument();
});

test('render a empty title', () => {
  render(<CategoryListItem category={{ ...fixtureCategoryItemA, title: '' }} />);
  expect(screen.getByText('이름 없음')).toBeInTheDocument();
});
