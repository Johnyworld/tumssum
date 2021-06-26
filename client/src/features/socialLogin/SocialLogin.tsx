import { h, FunctionalComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';


interface Props {
	disabled?: boolean;
	setLoading: StateUpdater<boolean>;
}

const SocialLogin: FunctionalComponent<Props> = ({ disabled, setLoading }) => {
	return (
		<div class='gap-small'>
			<KakaoLogin disabled={disabled} setLoading={setLoading} />
			<GoogleLogin disabled={disabled} setLoading={setLoading} />
		</div>
	)
}

export default SocialLogin;
