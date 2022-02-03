import { render, screen } from '@testing-library/react';
import { fixtureBankGroupA } from '~/fixtures/bank.fixture';
import BankListGroup from '.';

/**
 * - [x] render a empty title
 * - [x] render a empty list
 */

test('render a empty title', () => {
  render(<BankListGroup bankGroup={{ ...fixtureBankGroupA, title: '' }} />);
  expect(screen.getByText('이름 없음')).toBeInTheDocument();
});

test('render a empty list', () => {
  render(<BankListGroup bankGroup={{ ...fixtureBankGroupA, items: [] }} />);
  expect(screen.getByText('비어있음')).toBeInTheDocument();
});
