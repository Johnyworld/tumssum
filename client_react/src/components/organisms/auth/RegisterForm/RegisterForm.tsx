import React from 'react';
import { Color } from 'types';
import Button from '~/components/atoms/Button';
import LinkTo from '~/components/atoms/LinkTo';
import EmailInput from '~/components/molecules/inputs/EmailInput';
import TextInput from '~/components/molecules/inputs/TextInput';
import useForm from '~/hooks/useForm';
import { regEmail } from '~/utils/regex';

export interface RegisterFormProps {
	linkLoginPage: string;
	loading: boolean;
	message?: {
		color: Color;
		text: string;
	};
	onRegister: (name: string, email: string) => void;
}

const MAX_NAME_LENGTH = 20;

const RegisterForm: React.FC<RegisterFormProps> = ({ linkLoginPage, message, loading, onRegister }) => {

	const { values, errors, formRef, onChange, handleSubmit } = useForm([
		{ name: 'name', required: true, maxLength: MAX_NAME_LENGTH },
		{ name: 'email', required: true, pattern: regEmail },
	]);

	const onSubmit = () => {
		onRegister(values.name?.trim(), values.email?.trim());
	}

	return (
		<form className='login-form' ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)} data-testid='test-register-form'>
			<h1 className='login-form__title'>회원가입</h1>

			<section className='login-form__section login-form__section-form'>
				<TextInput
					name='name'
					label='이름'
					value={values.name || ''}
					fluid
					required
					maxLength={MAX_NAME_LENGTH}
					error={!!errors.name}
					errorMessage={errors.name === 'required' ? '이름을 입력해주세요' : errors.name === 'maxLength' ? '이름은 20자 이내로 입력해주세요.' : ''}
					testId='test-email'
					onChange={value => onChange('name', value)}
				/>
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
				<Button type='submit' fluid disabled={loading} children='회원가입' />
				{ message &&
					<p className={`c-${message.color}`}>{message.text}</p>
				}
			</section>

			<section className='login-form__section login-form__section-link'>
				<span>이미 회원이신가요?</span>
				<LinkTo to={linkLoginPage} colored>로그인</LinkTo>
			</section>
		</form>
	)
}

export default RegisterForm;
