import { render, screen, fireEvent } from '@testing-library/react';
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

test("it should perform the passed onClick function", async () => {
  const mockClick = jest.fn();
  const buttonText = 'Test Button'
  const { getByText } = render(
   <Button onClick={mockClick}>{buttonText}</Button>
  );
  fireEvent.click(getByText(buttonText));
  expect(mockClick.mock.calls.length).toBe(1);
});
