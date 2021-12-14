import { h, FunctionalComponent } from 'preact';
import SettingsContainer from '~containers/SettingsContainer';
import { useSelector } from '~utils/redux/hooks';
import './SettingsPage.scss';


const SettingsPage: FunctionalComponent = () => {

	const userInfo = useSelector(state=> state.user.userInfo);

	return (
		<main class='settings-page'>
			{ !userInfo
				? <p>유저 데이터가 없네요!</p>
				: <SettingsContainer user={userInfo} />
			}
		</main>
	)
	
}

export default SettingsPage;
