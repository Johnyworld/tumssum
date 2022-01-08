import { render, screen, fireEvent } from '@testing-library/react';
import LinkTo from '.';


test('renders children', () => {
  const children = 'Test Link'
  render(<LinkTo children={children} />);
  const linkElement = screen.getByText(children);
  expect(linkElement).toBeInTheDocument();
});


test('has http', () => {
  const link = 'https://example.com';
  const children = 'Test Link'
  render(<LinkTo to={link} children={children} />);
  const linkElement = screen.getByText(children);
  expect(linkElement).toHaveAttribute('target');
  expect(linkElement).toHaveAttribute('href');
});
