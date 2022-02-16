import { fireEvent, screen, render } from '@testing-library/react';
import TimePicker from './TimePicker';

test('renders time', () => {
  const mockClose = jest.fn();
  const mockChange = jest.fn();
  render(<TimePicker pos={{ x: 0, y: 0 }} time='20:55' onChange={mockChange} onClose={mockClose} />);
  expect(screen.getByDisplayValue(20)).toBeInTheDocument();
  expect(screen.getByDisplayValue(55)).toBeInTheDocument();
});

test('click close button', () => {
  const mockClose = jest.fn();
  const mockChange = jest.fn();
  render(<TimePicker pos={{ x: 0, y: 0 }} time='20:55' onChange={mockChange} onClose={mockClose} />);
  fireEvent.click(screen.getByText('Cancel'));
  expect(mockClose.mock.calls.length).toBe(1);
});
