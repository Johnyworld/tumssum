import React from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem } from 'types';
import Icon from '~/components/atoms/Icon';
import LinkTo from '~/components/atoms/LinkTo';
import Logo from '~/components/atoms/Logo';
import IconArea from '~/components/molecules/icons/IconArea';
import NavigationMenu from '~/components/molecules/menus/NavigationMenu';
import routes from '~/utils/routes';
import './GlobalHeader.scss';


const GlobalHeader: React.FC = () => {

	const { pathname } = useLocation();
	const page = pathname.split('/')[1] || 'home';

	const globalMenu: MenuItem[] = [
		{ id: 'home', text: 'Home', href: routes.home },
		{ id: 'category', text: 'Category', href: routes.category },
		{ id: 'bank', text: 'Bank', href: routes.bank },
	]

	return (
		<header className='global-header'>
			<div className='global-header__inner'>

				<Logo href={routes.home} />

				<NavigationMenu
					menu={globalMenu}
					selected={page}
				/>

				<LinkTo to={routes.settings}>
					<IconArea as='gear' areaSize='var(--header-height)' color='pencel' />
				</LinkTo>

			</div>
		</header>
	)
}

export default GlobalHeader;
