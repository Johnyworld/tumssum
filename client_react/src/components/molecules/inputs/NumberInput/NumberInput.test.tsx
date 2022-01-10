import { render, screen } from '@testing-library/react';
import NumberInput from ".";

const value = 8;
const name = 'email';
const mockChange = jest.fn();
const MIN = 5;
const MAX = 10;

test('render value with validation email type of number input', () => {
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} />);
	const el = screen.getByDisplayValue(value);
  expect(el).toBeInTheDocument();
  expect(el).toHaveAttribute('min');
  expect(el).toHaveAttribute('max');
});
