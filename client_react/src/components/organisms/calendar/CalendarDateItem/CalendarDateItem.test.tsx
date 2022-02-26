import { render, screen } from '@testing-library/react';
import { fixtureAccounts } from '~/fixtures/account.fixture';
import CalendarDateItem from './CalendarDateItem';

const mockClick = jest.fn();
const mockGrab = jest.fn();
const mockDrop = jest.fn();

test('renders a date', () => {
  render(
    <CalendarDateItem day={{ yyyymmdd: '2021-05-22' }} onClickAccount={mockClick} onGrab={mockGrab} onDrop={mockDrop} />
  );
  expect(screen.getByText('22')).toBeInTheDocument();
});

test('renders account list', () => {
  render(
    <CalendarDateItem
      day={{ yyyymmdd: '2021-05-22', accounts: fixtureAccounts }}
      onClickAccount={mockClick}
      onGrab={mockGrab}
      onDrop={mockDrop}
    />
  );
  expect(screen.getByRole('list').childNodes.length).toEqual(fixtureAccounts.length);
});
