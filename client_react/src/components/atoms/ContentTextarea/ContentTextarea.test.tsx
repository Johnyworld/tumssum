import { render, screen } from '@testing-library/react';
import ContentTextarea from '.';

const value = 'Hello world';
const placeholder = 'placeholder';
const mockChange = jest.fn();

test('render a placeholder', () => {
  render(<ContentTextarea value={value} placeholder={placeholder} onChange={mockChange} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render a label', () => {
  render(<ContentTextarea value={value} placeholder={placeholder} label='Label' onChange={mockChange} />);
  expect(screen.getByText('Label')).toBeInTheDocument();
});

test('render a default value', () => {
  render(<ContentTextarea value={value} placeholder={placeholder} onChange={mockChange} />);
  expect(screen.getByText(value)).toBeInTheDocument();
});
