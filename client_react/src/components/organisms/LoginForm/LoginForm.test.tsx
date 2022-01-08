import { render, screen } from '@testing-library/react';
import LoginForm from '.';

test('sending email', () => {
  render(<LoginForm linkRegisterPage='https://naver.com' sendingStatus='SENDING' onLogin={() => {}} />);
  expect(screen.getByText('인증 이메일 보내는 중...')).toBeInTheDocument();
});

test('sent email', () => {
  render(<LoginForm linkRegisterPage='https://naver.com' sendingStatus='SENT' onLogin={() => {}} />);
  expect(screen.getByText('인증 이메일을 보냈어요! 이메일을 확인해보세요.')).toBeInTheDocument();
});

test('error message', () => {
	const errorMessage = 'Error!';
  render(<LoginForm linkRegisterPage='https://naver.com' sendingError={errorMessage} sendingStatus='SENT' onLogin={() => {}} />);
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
