import { useCallback } from "preact/hooks";
import { IconType } from "types";
import useNavigationMenu from "~hooks/useNavigationMenu";


export default () => {

	const navigationMenu = useNavigationMenu<'graph' | 'list'>([
		{ id: 'graph', icon: 'graph' as IconType },
		{ id: 'list', icon: 'menu' as IconType },
	], localStorage.getItem('statistics_view') as 'graph' | 'list');

	const handleChangeMenu = useCallback((item: 'graph' | 'list') => {
		localStorage.setItem('statistics_view', item);
		navigationMenu.handleChangeMenu(item);
	}, [navigationMenu.currentMenu]);
	
	return {
		navigationMenu,
		handleChangeMenu,
	};
}