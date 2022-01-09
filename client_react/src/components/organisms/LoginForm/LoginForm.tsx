import React, { useCallback, useRef, useState } from 'react';
import Button from '~/components/atoms/Button';
import LinkTo from '~/components/atoms/LinkTo';
import EmailInput from '~/components/molecules/EmailInput';
import { regEmail } from '~/utils/regex';
import './LoginForm.scss';


export type SendingStatus = 'SENDING' | 'SENT';

export interface LoginFormProps {
	linkRegisterPage: string;
	sendingStatus?: SendingStatus;
	sendingError?: string;
	onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ linkRegisterPage, sendingStatus, sendingError, onLogin }) => {

	const emailRef = useRef<HTMLInputElement>(null);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(e => {
		e.preventDefault();
		let errs = 0;
		if (!email) {
			setEmailError('이메일을 입력해주세요.');
			emailRef.current?.focus();
			errs++;
		} else if (!regEmail.test(email)) {
			setEmailError('이메일 형식에 맞게 입력해주세요.');
			emailRef.current?.focus();
			errs++;
		}	
		if (errs) return;
		setEmailError('');
		onLogin(email);
	}, [email, emailRef.current]);


	return (
		<form className='login-form' noValidate onSubmit={handleSubmit}  data-testid='test-login-form'>
			<h1 className='login-form__title'>로그인</h1>

			<section className='login-form__section login-form__section-form'>
				<EmailInput
					name='email'
					label='이메일'
					value={email}
					fluid
					required
					error={!!emailError}
					errorMessage={emailError}
					forwardRef={emailRef}
					testId='test-email'
					onChange={setEmail}
				/>
				<Button type='submit' fluid disabled={sendingStatus === 'SENDING'} children='로그인' />
				{ sendingError
					? <p className='c-red'>{sendingError}</p>
					: sendingStatus === 'SENDING'
					? <p>인증 이메일 보내는 중...</p>
					: sendingStatus === 'SENT'
					? <p className='c-green'>인증 이메일을 보냈어요! 이메일을 확인해보세요.</p>
					: null
				}
			</section>

			<section className='login-form__section login-form__section-link'>
				<span>처음 방문하셨나요?</span>
				<LinkTo to={linkRegisterPage}>회원가입</LinkTo>
			</section>
		</form>
	)
}

export default LoginForm;
