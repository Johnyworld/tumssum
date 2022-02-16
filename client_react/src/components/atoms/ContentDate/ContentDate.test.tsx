import { render, screen } from '@testing-library/react';
import ContentDate from './ContentDate';

test('renders value', () => {
  const mockFn = jest.fn();
  render(<ContentDate yyyymmdd='2022-02-16' onChange={mockFn} />);
  screen.getByText('16 Feb 2022');
});

test('renders label', () => {
  const mockFn = jest.fn();
  render(<ContentDate label='Date' yyyymmdd='2022-02-16' onChange={mockFn} />);
  screen.getByText('Date');
});
