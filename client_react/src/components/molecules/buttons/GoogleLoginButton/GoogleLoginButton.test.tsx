import { render, screen } from '@testing-library/react';
import GoogleLoginButton from '.';



test('renders button text', () => {
	const ref = { current: {} } as React.LegacyRef<HTMLDivElement>;
  const buttonText = 'Google login'
  render(<GoogleLoginButton forwarRef={ref} children={buttonText} />);
  const linkElement = screen.getByText(buttonText);
  expect(linkElement).toBeInTheDocument();
});
