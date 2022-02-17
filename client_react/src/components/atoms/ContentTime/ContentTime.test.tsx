import { render, screen } from '@testing-library/react';
import ContentTime from './ContentTime';

test('renders value', () => {
  const mockFn = jest.fn();
  render(<ContentTime time='17:05:11.033z' placeholder='비어있음' onChange={mockFn} />);
  expect(screen.getByText('17:05')).toBeInTheDocument();
});

test('renders placeholder', () => {
  const mockFn = jest.fn();
  render(<ContentTime time='' placeholder='비어있음' onChange={mockFn} />);
  expect(screen.getByText('비어있음')).toBeInTheDocument();
});

test('renders label', () => {
  const mockFn = jest.fn();
  render(<ContentTime label='Time' time='17:05:11.033z' placeholder='비어있음' onChange={mockFn} />);
  expect(screen.getByText('Time')).toBeInTheDocument();
});
