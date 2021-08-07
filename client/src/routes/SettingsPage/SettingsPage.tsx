import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import Button from '~components/elements/Button';
import { changeTheme } from '~features/mode/modeSlice';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';


const SettingsPage: FunctionalComponent = () => {

	const { i18n } = useTranslation();

	const userInfo = useSelector(state=> state.user.userInfo);
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch();

	const handleChangeLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute("lang", lang);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

	const handleChangeTheme = () => {
		dispatch(changeTheme());
	}

	return (
		<main class='settings-page main wrap'>
			<div class='flex flex-end p-regular'>
				<button onClick={handleChangeLanguage('ko')}>KO</button>
				<button onClick={handleChangeLanguage('en')}>EN</button>
			</div>
			<Button onClick={handleChangeTheme}>{theme}</Button>
			{ userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
			{ userInfo && `Hello ${userInfo.name}` }
		</main>
	)
}

export default SettingsPage;
