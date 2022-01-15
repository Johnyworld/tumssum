import { MenuItem } from 'types';
import LinkTo from '~/components/atoms/LinkTo';
import { c } from '~/utils/classNames';
import './NavigationMenu.scss';

export interface NavigationMenuProps {
	menu: MenuItem[];	
	selected?: string;
}

const NavigationMenu = ({ selected, menu }: NavigationMenuProps) => {
	return (
		<nav className='navigation-menu' role='navigation'>
			<ul className='navigation-menu__list' role='menubar'>
				{ menu.map(item => (
					<li key={item.id} role='menuitem'>
						<LinkTo to={item.href}>
							<div className={c( 'navigation-menu__list-item', [selected === item.id, '&--selected'])}>
								{item.text}
							</div>
						</LinkTo>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default NavigationMenu;
