import React from 'react';
import Button from '~/components/atoms/Button';
import LinkTo from '~/components/atoms/LinkTo';
import EmailInput from '~/components/molecules/inputs/EmailInput';
import useForm from '~/hooks/useForm';
import { regEmail } from '~/utils/regex';
import './LoginForm.scss';


export type SendingStatus = 'SENDING' | 'SENT';

export interface LoginFormProps {
	linkRegisterPage: string;
	initialEmail?: string;
	sendingStatus?: SendingStatus;
	sendingError?: string;
	onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ linkRegisterPage, initialEmail, sendingStatus, sendingError, onLogin }) => {

	const { values, errors, formRef, onChange, handleSubmit } = useForm([
		{ name: 'email', init: initialEmail, required: true, pattern: regEmail },
	]);

	const onSubmit = () => onLogin(values.email?.trim());

	return (
		<form className='login-form' ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)} data-testid='test-login-form'>
			<h1 className='login-form__title'>로그인</h1>

			<section className='login-form__section login-form__section-form'>
				<EmailInput
					name='email'
					label='이메일'
					value={values.email || ''}
					fluid
					required
					error={!!errors.email}
					errorMessage={errors.email === 'required' ? '이메일을 입력해주세요.' : errors.email === 'pattern' ? '이메일 형식에 맞게 입력해주세요.' : ''}
					testId='test-email'
					onChange={value => onChange('email', value)}
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
