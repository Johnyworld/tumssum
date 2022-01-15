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
					<li
						className={c(
							'navigation-menu__list-item',
							[selected === item.id, '&--selected']
						)}
						role='menuitem'
						children={
							<LinkTo to={item.href}>
								{item.text}
							</LinkTo>
						}
					/>
				))}
			</ul>
		</nav>
	)
}

export default NavigationMenu;
