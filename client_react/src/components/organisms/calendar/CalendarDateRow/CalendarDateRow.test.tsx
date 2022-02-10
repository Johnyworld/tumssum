import { render, screen } from '@testing-library/react';
import CalendarDateRow from './CalendarDateRow';

const days = [
  { yyyymmdd: '2022-02-06' },
  { yyyymmdd: '2022-02-07' },
  { yyyymmdd: '2022-02-08' },
  { yyyymmdd: '2022-02-09' },
  { yyyymmdd: '2022-02-10' },
  { yyyymmdd: '2022-02-11' },
  { yyyymmdd: '2022-02-12' },
];

test('renders days', () => {
  render(<CalendarDateRow days={days} />);
  expect(screen.getByRole('list').childNodes.length).toEqual(days.length);
});
