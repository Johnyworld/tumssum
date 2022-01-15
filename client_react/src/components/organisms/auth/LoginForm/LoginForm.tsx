import React from 'react';
import { Color } from 'types';
import Button from '~/components/atoms/Button';
import LinkTo from '~/components/atoms/LinkTo';
import EmailInput from '~/components/molecules/inputs/EmailInput';
import useForm from '~/hooks/useForm';
import { regEmail } from '~/utils/regex';
import './LoginForm.scss';


export type SendingStatus = 'SENDING' | 'SENT';

export interface LoginFormProps {
	linkRegisterPage: string;
	loading: boolean;
	initialEmail?: string;
	message?: {
		color: Color;
		text: string;
	};
	onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ linkRegisterPage, loading, initialEmail, message, onLogin }) => {

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
				<Button type='submit' fluid disabled={loading} children='로그인' />
				{ message &&
					<p className={`c-${message.color}`}>{message.text}</p>
				}
			</section>

			<section className='login-form__section login-form__section-link'>
				<span>처음 방문하셨나요?</span>
				<LinkTo to={linkRegisterPage} colored>회원가입</LinkTo>
			</section>
		</form>
	)
}

export default LoginForm;
