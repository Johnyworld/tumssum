import { h, FunctionalComponent } from 'preact';
import Button from '~components/atoms/Button';
import Input from '~components/atoms/Input';
import LanguageSettingCard from '~containers/settings/LanguageSettingCard';
import ThemeSettingCard from '~containers/settings/ThemeSettingCard';
import useSettings from '~hooks/useSettings';
import useUser from '~hooks/useUser';
import { useSelector } from '~utils/redux/hooks';


const SettingsPage: FunctionalComponent = () => {

	const userInfo = useSelector(state=> state.user.userInfo);

	const { onLogout } = useUser.logout();
	const { onChangeTheme } = useSettings.changeTheme();
	const { onChangeLanguage } = useSettings.changeLanguage();


	return (
		<main class='settings-page gap-mv-large pv-huge main wrap'>
			
			{ userInfo &&
				<p
					class='f-huge pre'
					children={`안녕하세요 ${userInfo.name}님.\n서비스를 이용해주셔서 감사합니다.`}
				/>
			}

			{ userInfo && <Input value={userInfo.name} label='이름' name='username' maxLength={20} /> }

			<div class='gap-mv-regular'>
				<ThemeSettingCard onChange={onChangeTheme} />
				<LanguageSettingCard onChange={onChangeLanguage} />
			</div>

			<div class='flex mv-huge'>
				{ userInfo && <Button color='red' onClick={onLogout} class='gap-mv-regular' type='submit'>로그아웃</Button> }
			</div>

		</main>
	)
}

export default SettingsPage;
