import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { IconType } from 'types';
import Logo from '~components/atoms/Logo';
import IconText from '~components/molecules/IconText';
import './GlobalHeader.scss';

interface MenuItem {
	id: string;
	icon: IconType;
	text?: string;
	href?: string;
}

export interface GlobalHeaderProps {
	currentPage: string;
	menus: MenuItem[];
};

const GlobalHeader: FunctionalComponent<GlobalHeaderProps> = ({ currentPage, menus }) => {
	return (
		<header class='global-header'>
			<Logo  />
			<nav class='global-header__nav'>
				{ menus.map(menu => {
					const component =
						<div class='global-header__nav-item' key={menu.id}>
							<IconText
								icon={menu.icon}
								text={menu.text}
								bold
								isHideTextForMobile
								color={currentPage === menu.id ? 'pen' : 'gray'}
							/>
						</div>
					return (
						menu.href
						? <Link href={menu.href}>
								{component}
							</Link>
						: component
					)
				})}
			</nav>
		</header>
	)
}

export default GlobalHeader;
