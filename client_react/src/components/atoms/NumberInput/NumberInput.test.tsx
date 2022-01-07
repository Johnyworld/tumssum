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

test('render placeholder of number input', () => {
	const placeholder = 'placeholder';
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} placeholder={placeholder} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render label of number input', () => {
	const label = 'label';
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} label={label} />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test('render readOnly of number input', () => {
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} readOnly />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('readOnly');
});

test('render required of number input', () => {
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} required />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('required');
});

test('render disabled of number input', () => {
  render(<NumberInput name={name} min={MIN} max={MAX} value={value} onChange={mockChange} disabled />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('disabled');
});
