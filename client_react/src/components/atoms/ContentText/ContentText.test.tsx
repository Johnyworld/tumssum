import { render, screen } from '@testing-library/react';
import ContentText from '.';

const value = 'Hello world';
const placeholder = 'placeholder';
const mockChange = jest.fn();

test('renders a placeholder', () => {
  render(<ContentText value={value} placeholder={placeholder} onChange={mockChange} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('renders a default value', () => {
  render(<ContentText value={value} placeholder={placeholder} onChange={mockChange} />);
  expect(screen.getByText(value)).toBeInTheDocument();
});
