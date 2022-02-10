import { render, screen } from '@testing-library/react';
import CalendarDateRow from './CalendarDateRow';

const days = [
  { yyyymmdd: '2022-02-06', isThisMonth: true },
  { yyyymmdd: '2022-02-07', isThisMonth: true },
  { yyyymmdd: '2022-02-08', isThisMonth: true },
  { yyyymmdd: '2022-02-09', isThisMonth: true },
  { yyyymmdd: '2022-02-10', isThisMonth: true, isToday: true },
  { yyyymmdd: '2022-02-11', isThisMonth: true },
  { yyyymmdd: '2022-02-12', isThisMonth: true },
];

test('renders days', () => {
  render(<CalendarDateRow days={days} />);
  expect(screen.getByRole('list').childNodes.length).toEqual(days.length);
});
