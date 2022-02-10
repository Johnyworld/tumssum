import { render, screen } from '@testing-library/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import CalendarDateItem from './CalendarDateItem';

test('renders a date', () => {
  render(<CalendarDateItem date='5' accounts={fixtureAccounts} />);
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('renders account list', () => {
  render(<CalendarDateItem date='5' accounts={fixtureAccounts} />);
  expect(screen.getByRole('list').childNodes.length).toEqual(fixtureAccounts.length);
});
