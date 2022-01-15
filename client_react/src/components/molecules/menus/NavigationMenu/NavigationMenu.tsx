import { MenuItem } from 'types';
import LinkTo from '~/components/atoms/LinkTo';
import { c } from '~/utils/classNames';
import './NavigationMenu.scss';

export interface NavigationMenuProps<T> {
	menus: MenuItem<T>[];	
	selected?: T;
	onChange: (selected: T) => void;
}

const NavigationMenu = <T extends {}>({ selected, menus, onChange }: NavigationMenuProps<T>) => {
	return (
		<nav className='navigation-menu' role='navigation'>
			<ul className='navigation-menu__list' role='menubar'>
				{ menus.map(menu => (
					<li
						className={c(
							'navigation-menu__list-item',
							[selected === menu.id, '&--selected']
						)}
						role='menuitem'
						onClick={() => onChange(menu.id)}
						children={
							<LinkTo to={menu.href}>
								{menu.text}
							</LinkTo>
						}
					/>
				))}
			</ul>
		</nav>
	)
}

export default NavigationMenu;
