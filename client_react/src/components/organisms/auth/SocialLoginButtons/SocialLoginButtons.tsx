import React from 'react';
import GoogleLoginButton from '~/components/molecules/buttons/GoogleLoginButton';
import KakaoLoginButton from '~/components/molecules/buttons/KakaoLoginButton';
import './SocialLoginButtons.scss';

export interface SocialLoginButtonsProps {
	googleButtonRef: React.LegacyRef<HTMLDivElement>; 
	onClickKakao: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ googleButtonRef, onClickKakao }) => {
	return (
		<div className='social-login-buttons'>
			<KakaoLoginButton fluid onClick={onClickKakao} children='카카오 계정으로 계속' />
			<GoogleLoginButton fluid forwarRef={googleButtonRef} children='구글 계정으로 계속' />
		</div>
	)
}

export default SocialLoginButtons;
