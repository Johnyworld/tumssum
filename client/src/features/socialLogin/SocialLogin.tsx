import { h, FunctionalComponent } from 'preact';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';


const SocialLogin: FunctionalComponent = () => {
	return (
		<div class='gap-mv-small'>
			<KakaoLogin />
			<GoogleLogin />
		</div>
	)
}

export default SocialLogin;
