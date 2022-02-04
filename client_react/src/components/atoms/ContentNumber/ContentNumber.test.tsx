import { render, screen } from '@testing-library/react';
import ContentText from '.';

const value = 'Hello world';
const placeholder = 'placeholder';
const mockChange = jest.fn();

test('render a placeholder', () => {
  render(<ContentText value={value} placeholder={placeholder} onChange={mockChange} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test('render a label', () => {
  render(<ContentText value={value} placeholder={placeholder} label='Label' onChange={mockChange} />);
  expect(screen.getByText('Label')).toBeInTheDocument();
});
