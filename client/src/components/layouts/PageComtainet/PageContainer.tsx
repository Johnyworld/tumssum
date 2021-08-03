import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import Aside from '~components/layouts/Aside';
import Button from '~components/elements/Button';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import ThemeChanger from '~features/theme/ThemeChanger';
import Indicator from '../Indicator';
import { useState } from 'preact/hooks';
import { useLocation } from 'wouter';
import AsideMenu from '~components/items/AsideMenu';
import './PageContainer.scss';


interface PageContainerProps {
}

const PageContainer: FunctionalComponent<PageContainerProps> = ({ children }) => {

	const [location] = useLocation();
	const path = location.split('/')[1] || 'home';
	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();
	const [isOpenAside, setIsOpenAside] = useState(localStorage.getItem('asideopen') === 'close' ? false : true);


	const toggleAside = () => {
		if (isOpenAside) {
			setIsOpenAside(false);
			localStorage.setItem('asideopen', 'close');
		} else {
			setIsOpenAside(true);
			localStorage.setItem('asideopen', 'open');
		}
	}


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
		<div class='page-container'>
			<Aside mode={isOpenAside ? 'normal' : 'icon'} class='hide-tablet' >
				<div class='header'>
					<button onClick={toggleAside}>Test</button>
					{/* <Logo /> */}
				</div>
				<Indicator>

				</Indicator>
				<AsideMenu
					selected={path}
					isOpen={isOpenAside}
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
			<main class='page-container-main' >
				{children}
			</main>
		</div>
	)
}

export default PageContainer;
