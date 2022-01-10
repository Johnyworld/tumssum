import React, { useRef } from 'react';
import LogoSlogan from '~/components/molecules/logos/LogoSlogan';
import LoginForm from '~/components/organisms/auth/LoginForm';
import SocialLoginButtons from '~/components/organisms/auth/SocialLoginButtons';
import './LoginPage.scss';


const LoginPage: React.FC = () => {

  const googleButtonRef = useRef<HTMLDivElement>(null);

	return (
		<div className='login-page'>
			<LogoSlogan logoHref='/' />
			<LoginForm
				linkRegisterPage='/register'
				onLogin={() => {}}
			/>
			<SocialLoginButtons
				googleButtonRef={googleButtonRef}	
				onClickKakao={() => {}}
			/>
		</div>
	)
}

export default LoginPage;
