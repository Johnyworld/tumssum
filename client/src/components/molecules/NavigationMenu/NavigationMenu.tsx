import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps, IconType, SelectMenuItem } from 'types';
import { c } from '~utils/classNames';
import IconMenuItem from '../IconMenuItem';
import './NavigationMenu.scss';


interface NavigationMenuItemInterface extends SelectMenuItem {
	icon: IconType;
	href?: string
}

export interface NavigationMenuProps extends DefaultProps {
	list: NavigationMenuItemInterface[];
	selected?: string;
	onChange?: (selected: string) => void;
}

const NavigationMenu: FunctionalComponent<NavigationMenuProps> = ({ class: className, list, selected, onChange }) => {
	return (
		<nav class={c( 'navigation-menu', className )} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				const content
					= <IconMenuItem
							icon={item.icon}
							text={item.text}
							isSelected={isSelected}
							onClick={onChange ? () => onChange(item.id) : undefined}
						/>

				return (
					item.href
						? <Link href={item.href} class={c('navigation-menu-item-content')}>
								{content}
							</Link>
						: content
				)
			})}
		</nav>
	)
}

export default NavigationMenu;
