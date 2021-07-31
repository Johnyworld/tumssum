import { h, FunctionalComponent, Fragment } from 'preact';
import { useTranslation } from 'preact-i18next';
import Logo from '~components/elements/Logo';
import NavigationMenu from '~components/items/NavigationMenu';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';
import Button from '~components/elements/Button';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import ThemeChanger from '~features/theme/ThemeChanger';
import './PageContainer.scss';


const PageContainer: FunctionalComponent = ({ children }) => {

	const path = window.location.pathname.split('/')[1] || 'home';
	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout());
  }

	const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute("lang", lang);
  }


	return (
		<Fragment>
			<Header />
			<Aside class='hide-tablet p-big'>
				<Logo />
				<NavigationMenu
					class='mv-large'
					selected={path}
					direction='column'
					menuItemType='box'
					list={[
						{ id: 'home', text: 'Home', icon: 'home', href: '/' },
						{ id: 'budget', text: 'Budget', icon: 'card', href: '/budget' },
						{ id: 'category', text: 'Category', icon: 'menu', href: '/category' },
						{ id: 'bank', text: 'Bank', icon: 'storage', href: '/bank' },
					]}
				/>
				<div class='flex flex-end p-regular'>
					<button onClick={handleChangeLanguage('ko')}>KO</button>
					<button onClick={handleChangeLanguage('en')}>EN</button>
				</div>
				<ThemeChanger />
				{ userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
				{ userInfo && `Hello ${userInfo.name}`}
			</Aside>
			<main class='page-container'>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
