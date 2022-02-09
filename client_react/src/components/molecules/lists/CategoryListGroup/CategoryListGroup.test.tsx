import { render, screen } from '@testing-library/react';
import { fixtureCategoryGroupA } from '~/fixtures/category.fixture';
import CategoryListGroup from './CategoryListGroup';

/**
 * - [x] render a empty title
 * - [x] render a empty list
 */

test('render a empty title', () => {
  render(<CategoryListGroup categoryGroup={{ ...fixtureCategoryGroupA, title: '' }} />);
  expect(screen.getByText('이름 없음')).toBeInTheDocument();
});

test('render a empty list', () => {
  render(<CategoryListGroup categoryGroup={{ ...fixtureCategoryGroupA, items: [] }} />);
  expect(screen.getByText('비어있음')).toBeInTheDocument();
});
