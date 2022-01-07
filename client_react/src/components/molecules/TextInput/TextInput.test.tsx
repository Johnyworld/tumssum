import { render, screen } from '@testing-library/react';
import TextInput from '.';

const value = 'Hello world';
const name = 'email';
const mockChange = jest.fn();

test('render value', () => {
  render(<TextInput name={name} maxLength={false} minLength={false} value={value} onChange={mockChange} />);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});
