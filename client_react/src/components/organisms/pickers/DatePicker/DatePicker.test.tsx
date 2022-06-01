import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';

const mockChange = jest.fn();
const mockClose = jest.fn();

test('renders days', () => {
  render(<DatePicker pos={{ x: 0, y: 0 }} value='2022-02-10' onChange={mockChange} onClose={mockClose} />);
  ['sun', 'mon', 'tue', 'web', 'thu', 'fri', 'sat'].forEach(day => {
    expect(screen.getByText(day)).toBeInTheDocument();
  });
});

test('renders dates', () => {
  render(<DatePicker pos={{ x: 0, y: 0 }} value='2022-02-10' onChange={mockChange} onClose={mockClose} />);
  expect(screen.getByText('Feb 2022')).toBeInTheDocument();
  for (let i = 0; i < 28; i++) {
    expect(screen.getByText(i + 1)).toBeInTheDocument();
  }
});
