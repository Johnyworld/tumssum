import React, { useRef } from 'react';
import LogoSlogan from '~/components/molecules/logos/LogoSlogan';
import RegisterForm from '~/components/organisms/auth/RegisterForm';
import SocialLoginButtons from '~/components/organisms/auth/SocialLoginButtons';
import useGoogleLogin from '~/hooks/auth/useGoogleLogin';
import useKakaoLogin from '~/hooks/auth/useKakaoLogin';
import useRegister from '~/hooks/auth/useRegister';
import './RegisterPage.scss';


const RegisterPage: React.FC = () => {

	const { loading, error, handleRegister } = useRegister();
	const kakaoLogin = useKakaoLogin();
	const googleButtonRef = useGoogleLogin();

	return (
		<div className='register-page'>
			<LogoSlogan logoHref='/' />
			<RegisterForm
				linkLoginPage='/login'
				loading={loading}
				onRegister={handleRegister}
			/>
			<SocialLoginButtons
				onClickKakao={kakaoLogin}
				googleButtonRef={googleButtonRef}	
			/>
		</div>
	)
}

export default RegisterPage;
