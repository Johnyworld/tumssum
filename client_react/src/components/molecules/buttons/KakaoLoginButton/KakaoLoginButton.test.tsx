import { render, screen, fireEvent } from '@testing-library/react';
import KakaoLoginButton from '.';

test('renders button text', () => {
  const buttonText = 'Test Button'
  const mockClick = jest.fn();
  render(<KakaoLoginButton onClick={mockClick} children={buttonText} />);
  const linkElement = screen.getByText(buttonText);
  expect(linkElement).toBeInTheDocument();
});

test("it should perform the passed onClick function", async () => {
  const mockClick = jest.fn();
  const buttonText = 'Test Button'
  const { getByText } = render(
   <KakaoLoginButton onClick={mockClick}>{buttonText}</KakaoLoginButton>
  );
  fireEvent.click(getByText(buttonText));
  expect(mockClick.mock.calls.length).toBe(1);
});