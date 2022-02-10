import { render, screen } from '@testing-library/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import CalendarDateItem from './CalendarDateItem';

test('renders a date', () => {
  render(<CalendarDateItem day={{ yyyymmdd: '2021-05-22' }} />);
  expect(screen.getByText('22')).toBeInTheDocument();
});

test('renders account list', () => {
  render(<CalendarDateItem day={{ yyyymmdd: '2021-05-22', accounts: fixtureAccounts }} />);
  expect(screen.getByRole('list').childNodes.length).toEqual(fixtureAccounts.length);
});
