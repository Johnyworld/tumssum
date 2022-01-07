import { render, screen } from '@testing-library/react';
import Input from '.';

const value = 'Hello world';
const name = 'input';
const mockChange = jest.fn();

test('render placeholder', () => {
	const placeholder = 'placeholder';
  render(<Input name={name} value={value} onChange={mockChange} placeholder={placeholder} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render label', () => {
	const label = 'label';
  render(<Input name={name} value={value} onChange={mockChange} label={label} />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test('render readOnly', () => {
  render(<Input name={name} value={value} onChange={mockChange} readOnly />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('readOnly');
});

test('render required', () => {
  render(<Input name={name} value={value} onChange={mockChange} required />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('required');
});

test('render disabled', () => {
  render(<Input name={name} value={value} onChange={mockChange} disabled />);
  expect(screen.getByDisplayValue(value)).toHaveAttribute('disabled');
});


