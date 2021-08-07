import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import Aside from '~components/partials/Aside';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { useMemo, useState } from 'preact/hooks';
import { useLocation } from 'wouter';
import './PageContainer.scss';
import { AsideMenuItem } from '~components/items/AsideMenu/AsideMenu';


interface PageContainerProps {
}

const PageContainer: FunctionalComponent<PageContainerProps> = ({ children }) => {

	const [location] = useLocation();
	const path = location.split('/')[1] || 'home';
	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();
	const [isOpenAside, setIsOpenAside] = useState(localStorage.getItem('asideopen') === 'close' ? false : true);


	const gnbMenuList = useMemo(() => { return [
		{ id: 'home', text: 'Home', icon: 'home', href: '/' },
		{ id: 'budget', text: 'Budget', icon: 'card', href: '/budget' },
		{ id: 'category', text: 'Category', icon: 'menu', href: '/category' },
		{ id: 'bank', text: 'Bank', icon: 'storage', href: '/bank' },
	] as AsideMenuItem[]}, []);

	const bottomMenuList = useMemo(() => { return [
		{ id: 'settings', text: 'Settings', icon: 'home', href: '/settings' },
	] as AsideMenuItem[]}, []);


	const handleToggleAside = () => {
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
			<Aside
				path={path}
				gnbMenuList={gnbMenuList}
				bottomMenuList={bottomMenuList}
				isNarrow={!isOpenAside}
				onToggleAside={handleToggleAside}
			/>
			<main class='page-container__main' >
				{children}
			</main>
		</div>
	)
}

export default PageContainer;
