/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '.';

const dummyLink = 'https://naver.com';
const mockLogin = jest.fn();

describe('login form renders', () => {
  it('sending email', () => {
    render(
      <LoginForm
        linkRegisterPage={dummyLink}
        loading={false}
        message={{ color: 'red', text: '인증 이메일 보내는 중...' }}
        onLogin={mockLogin}
      />
    );
    expect(screen.getByText('인증 이메일 보내는 중...')).toBeInTheDocument();
  });
});

describe('login form validation', () => {
  it('validate email inputs and provides error messages', async () => {
    render(<LoginForm loading={false} linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act(async () => {
      fireEvent.change(screen.getByTestId('test-email'), { target: { value: 'email@example.com' } });
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('test-login-form'));
    });
    expect(screen.queryByText('이메일 형식에 맞게 입력해주세요.')).not.toBeInTheDocument();
    expect(screen.queryByText('이메일을 입력해주세요.')).not.toBeInTheDocument();
  });

  it('validate email inputs form and provides error messages', async () => {
    render(<LoginForm loading={false} linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act(async () => {
      fireEvent.change(screen.getByTestId('test-email'), { target: { value: 'anytext' } });
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('test-login-form'));
    });
    expect(screen.getByText('이메일 형식에 맞게 입력해주세요.')).toBeInTheDocument();
  });

  it('validate email input and provides error messages', async () => {
    render(<LoginForm loading={false} linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act(async () => {
      fireEvent.change(screen.getByTestId('test-email'), { target: { value: '' } });
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('test-login-form'));
    });
    expect(screen.getByText('이메일을 입력해주세요.')).toBeInTheDocument();
  });
});
