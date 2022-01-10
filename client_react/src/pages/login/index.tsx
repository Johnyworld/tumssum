import React from 'react';
import LogoSlogan from '~/components/molecules/logos/LogoSlogan';
import LoginForm from '~/components/organisms/auth/LoginForm';
import SocialLoginButtons from '~/components/organisms/auth/SocialLoginButtons';
import useEmailLogin from '~/hooks/auth/useEmailLogin';
import useGoogleLogin from '~/hooks/auth/useGoogleLogin';
import useKakaoLogin from '~/hooks/auth/useKakaoLogin';
import useQuery from '~/hooks/useQuery';
import './LoginPage.scss';


const LoginPage: React.FC = () => {

	const { isSent, loading, error, handleSend } = useEmailLogin();
	const kakaoLogin = useKakaoLogin();
	const googleButtonRef = useGoogleLogin();
	const email = useQuery('email');

	return (
		<div className='login-page'>
			<LogoSlogan logoHref='/' />
			<LoginForm
				linkRegisterPage='/register'
				loading={loading}
				initialEmail={email || ''}
				message={
					error
					? { color: 'red', text: error }
					: loading
					? { color: 'pencel', text: '인증 이메일 보내는 중...' }
					: isSent
					? { color: 'green', text: '인증 이메일을 보냈어요! 이메일을 확인해보세요.' }
					: undefined
				}
				onLogin={handleSend}
			/>
			<SocialLoginButtons
				onClickKakao={kakaoLogin}
				googleButtonRef={googleButtonRef}	
			/>
		</div>
	)
}

export default LoginPage;
