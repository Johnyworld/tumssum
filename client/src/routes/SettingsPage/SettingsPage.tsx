import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import Button from '~components/atoms/Button';
import Card from '~components/atoms/Card';
import useToast from '~hooks/useToast';
import { changeTheme } from '~stores/modeSlice';
import { logout } from '~stores/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';


const SettingsPage: FunctionalComponent = () => {

	const { i18n } = useTranslation();

	const userInfo = useSelector(state=> state.user.userInfo);
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch();
	const toast = useToast();

	const handleChangeLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute("lang", lang);
		toast(`언어를 ${lang === 'ko' ? '한국어' : '영어'}로 변경했습니다.`, 'green')
  }

  const handleLogout = () => {
    dispatch(logout());
  }

	const handleChangeTheme = () => {
		dispatch(changeTheme());
	}

	return (
		<main class='settings-page main wrap'>
			
			{ userInfo &&
				<p
					class='f-huge pv-huge pre'
					children={`안녕하세요 ${userInfo.name}님.\n서비스를 이용해주셔서 감사합니다.`}
				/>
			}

			<div class='gap-mv-regular'>
				<Card>
					<h3>테마</h3>
					<div class='flex flex-end'>
						<Button onClick={handleChangeTheme}>변경</Button>
					</div>
				</Card>

				<Card>
					<h3>언어</h3>
					<div class='flex flex-end gap-small'>
						<Button onClick={handleChangeLanguage('ko')}>한국어</Button>
						<Button onClick={handleChangeLanguage('en')}>English</Button>
					</div>
				</Card>
			</div>

			<div class='flex mv-huge'>
				{ userInfo && <Button color='red' onClick={handleLogout} class='gap-mv-regular' type='submit'>로그아웃</Button> }
			</div>

		</main>
	)
}

export default SettingsPage;
