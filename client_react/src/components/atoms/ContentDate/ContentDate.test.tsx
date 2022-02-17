import { render, screen } from '@testing-library/react';
import ContentDate from './ContentDate';

test('renders value', () => {
  const mockFn = jest.fn();
  render(<ContentDate yyyymmdd='2022-02-16' placeholder='비어있음' onChange={mockFn} />);
  expect(screen.getByText('16 Feb 2022')).toBeInTheDocument();
});

test('renders placeholder', () => {
  const mockFn = jest.fn();
  render(<ContentDate yyyymmdd='' placeholder='비어있음' onChange={mockFn} />);
  expect(screen.getByText('비어있음')).toBeInTheDocument();
});

test('renders label', () => {
  const mockFn = jest.fn();
  render(<ContentDate label='Date' placeholder='비어있음' yyyymmdd='2022-02-16' onChange={mockFn} />);
  expect(screen.getByText('Date')).toBeInTheDocument();
});
