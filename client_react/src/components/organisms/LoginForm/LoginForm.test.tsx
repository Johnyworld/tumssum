import { act, fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '.';

const dummyLink = 'https://naver.com';
const mockLogin = jest.fn();


describe('login form renders', () => {
  it('sending email', () => {
    render(<LoginForm linkRegisterPage={dummyLink} sendingStatus='SENDING' onLogin={mockLogin} />);
    expect(screen.getByText('인증 이메일 보내는 중...')).toBeInTheDocument();
  });
  
  it('sent email', () => {
    render(<LoginForm linkRegisterPage={dummyLink} sendingStatus='SENT' onLogin={mockLogin} />);
    expect(screen.getByText('인증 이메일을 보냈어요! 이메일을 확인해보세요.')).toBeInTheDocument();
  });
  
  it('error message', () => {
    const errorMessage = 'Error!';
    render(<LoginForm linkRegisterPage={dummyLink} sendingError={errorMessage} sendingStatus='SENT' onLogin={mockLogin} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});



describe('login form validation', () => {

  it('validate email inputs and provides error messages', async () => {
    const { getByTestId, queryByText } = render(<LoginForm linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act (async () => {
      fireEvent.change(getByTestId('test-email'), { target: {value: 'email@example.com'} })
    });
    await act (async () => {
      fireEvent.submit(getByTestId('test-login-form'));
    });
    expect(queryByText('이메일 형식에 맞게 입력해주세요.')).not.toBeInTheDocument();
    expect(queryByText('이메일을 입력해주세요.')).not.toBeInTheDocument();
  });


  it('validate email inputs and provides error messages', async () => {
    const { getByTestId, getByText } = render(<LoginForm linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act (async () => {
      fireEvent.change(getByTestId('test-email'), { target: {value: 'anytext'} })
    });
    await act (async () => {
      fireEvent.submit(getByTestId('test-login-form'));
    });
    expect(getByText('이메일 형식에 맞게 입력해주세요.')).toBeInTheDocument();
  });


  it('validate email inputs and provides error messages', async () => {
    const { getByTestId, getByText } = render(<LoginForm linkRegisterPage={dummyLink} onLogin={mockLogin} />);
    await act (async () => {
      fireEvent.change(getByTestId('test-email'), { target: {value: ''} });
    });
    await act (async () => {
      fireEvent.submit(getByTestId('test-login-form'));
    });
    expect(getByText('이메일을 입력해주세요.')).toBeInTheDocument();
  });

});

