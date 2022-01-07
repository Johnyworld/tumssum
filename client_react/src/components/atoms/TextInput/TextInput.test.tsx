import { render, screen } from '@testing-library/react';
import TextInput from '.';

const value = 'Hello world';
const name = 'email';
const mockChange = jest.fn();

test('render value', () => {
  render(<TextInput name={name} value={value} onChange={mockChange} />);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test('render placeholder', () => {
	const placeholder = 'placeholder';
  render(<TextInput name={name} value={value} onChange={mockChange} placeholder={placeholder} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render label', () => {
	const label = 'label';
  render(<TextInput name={name} value={value} onChange={mockChange} label={label} />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test('render readOnly', () => {
  render(<TextInput name={name} value={value} onChange={mockChange} readOnly />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('readOnly');
});

test('render required', () => {
  render(<TextInput name={name} value={value} onChange={mockChange} required />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('required');
});

test('render disabled', () => {
  render(<TextInput name={name} value={value} onChange={mockChange} disabled />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('disabled');
});


