import { render, screen } from '@testing-library/react';
import ContentTime from './ContentTime';

test('renders value', () => {
  const mockFn = jest.fn();
  render(<ContentTime time='17:05:11.033z' onChange={mockFn} />);
  screen.getByText('17:05');
});

test('renders label', () => {
  const mockFn = jest.fn();
  render(<ContentTime label='Time' time='17:05:11.033z' onChange={mockFn} />);
  screen.getByText('Time');
});
