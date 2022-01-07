import { render, screen } from '@testing-library/react';
import EmailInput from ".";

const value = 'test@email.com'
const mockChange = jest.fn();

test('render value with validation email type', () => {
  render(<EmailInput value={value} onChange={mockChange} />);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test('render placeholder', () => {
	const placeholder = 'placeholder';
  render(<EmailInput value={value} onChange={mockChange} placeholder={placeholder} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render label', () => {
	const label = 'label';
  render(<EmailInput value={value} onChange={mockChange} label={label} />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test('render readOnly', () => {
  render(<EmailInput value={value} onChange={mockChange} readOnly />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('readOnly');
});

test('render required', () => {
  render(<EmailInput value={value} onChange={mockChange} required />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('required');
});

test('render disabled', () => {
  render(<EmailInput value={value} onChange={mockChange} disabled />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('disabled');
});


