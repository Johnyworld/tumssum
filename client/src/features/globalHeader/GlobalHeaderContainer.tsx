import { h, FunctionalComponent } from 'preact';
import { useMemo } from 'preact/hooks';
import { useLocation } from 'wouter';
import { AsideMenuItem } from '~components/molecules/AsideMenu/AsideMenu';
import GlobalHeader from '~components/organisms/GlobalHeader';


const GlobalHeaderContainer: FunctionalComponent = () => {

	const [location] = useLocation();
	const path = location.split('/')[1] || 'home';

	const gnbMenus = useMemo(() => { return [
		{ id: 'home', text: 'Home', icon: 'home', href: '/' },
		{ id: 'category', text: 'Category', icon: 'category', href: '/category' },
		{ id: 'bank', text: 'Bank', icon: 'storage', href: '/bank' },
		{ id: 'settings', icon: 'gear', href: '/settings' },
	] as AsideMenuItem[]}, []);

	return <GlobalHeader currentPage={path} menus={gnbMenus} />
}

export default GlobalHeaderContainer;
