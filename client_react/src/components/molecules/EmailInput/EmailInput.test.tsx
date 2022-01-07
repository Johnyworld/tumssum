import { render, screen } from '@testing-library/react';
import EmailInput from ".";

const value = 'test@email.com';
const name = 'email';
const mockChange = jest.fn();

test('render value with validation email type', () => {
  render(<EmailInput name={name} value={value} onChange={mockChange} />);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

