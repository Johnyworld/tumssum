import { render, screen } from '@testing-library/react';
import MonthPicker from '.';

const mockChange = jest.fn();
const mockClose = jest.fn();

test('renders a month', () => {
  render(<MonthPicker pos={{ x: 0, y: 0 }} yyyymm='2022-02' onChange={mockChange} onClose={mockClose} />);
  expect(screen.getByText('2022')).toBeInTheDocument();
  for (let i = 0; i < 12; i++) {
    expect(screen.getByText(i + 1)).toBeInTheDocument();
  }
});
