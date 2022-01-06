import { render, screen } from '@testing-library/react';
import Button from '.';

test('renders button text', () => {
  const buttonText = 'Test Button'
  render(<Button children={buttonText} />);
  const linkElement = screen.getByText(buttonText);
  expect(linkElement).toBeInTheDocument();
});

test('renders button text is empty', () => {
  const buttonText = '';
  render(<Button children={buttonText} />);
  const linkElement = screen.getByText('Confirm');
  expect(linkElement).toBeInTheDocument();
});
