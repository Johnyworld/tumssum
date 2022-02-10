import { render, screen } from '@testing-library/react';
import { fixtureAccountA, fixtureAccountC } from '~/fixtures/account.fixture';
import numberUtil from '~/utils/numberUtil';
import CalendarAccountItem from './CalendarAccountItem';

test('render a listitem', () => {
  render(<CalendarAccountItem account={fixtureAccountA} />);
  expect(screen.getByText(fixtureAccountA.title)).toBeInTheDocument();
  expect(screen.getByText(fixtureAccountA.memo!)).toBeInTheDocument();
  expect(screen.getByText(numberUtil.getComma(fixtureAccountA.account))).toBeInTheDocument();
});

test('render a empty title', () => {
  render(<CalendarAccountItem account={fixtureAccountC} />);
  expect(screen.getByText('제목 없음')).toBeInTheDocument();
});

test('render a no account', () => {
  render(<CalendarAccountItem account={fixtureAccountC} />);
  expect(screen.getByText('0')).toBeInTheDocument();
});
