import React from 'react';
import Button from '~/components/atoms/Button';
import './KakaoLoginButton.scss';

export interface KakaoLoginButtonProps {
	onClick?: () => void;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ children, onClick }) => {
	return (
		<Button fluid className='kakao-login-button' onClick={onClick} type='button'>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.99993 1.99996C5.03013 1.99996 0.999931 5.08277 0.999931 8.8849C0.999931 11.3599 2.70813 13.5283 5.26953 14.7422C5.08053 15.4215 4.58733 17.205 4.49013 17.5864C4.36773 18.0602 4.66833 18.0532 4.86633 17.9261C5.02113 17.8268 7.33233 16.3063 8.32953 15.6497C8.87133 15.7281 9.42933 15.7681 9.99993 15.7681C14.9697 15.7681 18.9999 12.6853 18.9999 8.88316C18.9999 5.08103 14.9697 1.99996 9.99993 1.99996Z" fill="#381E1F"/>
			</svg>
			<span>{children}</span>
		</Button>
	)
}

export default KakaoLoginButton;
