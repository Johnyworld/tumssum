import React, { useRef } from 'react';
import LogoSlogan from '~/components/molecules/logos/LogoSlogan';
import RegisterForm from '~/components/organisms/auth/RegisterForm';
import SocialLoginButtons from '~/components/organisms/auth/SocialLoginButtons';
import './RegisterPage.scss';


const RegisterPage: React.FC = () => {

  const googleButtonRef = useRef<HTMLDivElement>(null);

	return (
		<div className='register-page'>
			<LogoSlogan logoHref='/' />
			<RegisterForm
				linkLoginPage='/login'
				loading={false}
				onRegister={() => {}}
			/>
			<SocialLoginButtons
				googleButtonRef={googleButtonRef}	
				onClickKakao={() => {}}
			/>
		</div>
	)
}

export default RegisterPage;
