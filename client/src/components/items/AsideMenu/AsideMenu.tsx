import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps, IconType, SelectMenuItem } from 'types';
import { getClassNames } from '~utils/classNames';
import IconText from '../IconText';
import './AsideMenu.scss';


interface AsideMenuItemProps extends SelectMenuItem {
	icon: IconType;
	href?: string
}


export interface AsideMenuProps extends DefaultProps {
	list: AsideMenuItemProps[];
	selected?: string;
	isOpen: boolean;
}

const AsideMenu: FunctionalComponent<AsideMenuProps> = ({ class: className, style, list, selected, isOpen }) => {
	return (
		<nav style={style} class={getClassNames([ 'aside-menu', className ])} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				return (
					<Link key={item.id} href={item.href}>
						<div class={getClassNames([ 'aside-menu-item', [isOpen, 'aside-menu-item-open'], [isSelected, 'selected'] ])}>
							<IconText
								icon={item.icon}
								text={item.text}
								class={isOpen ? '' : 'hide-text'}
								color={isSelected ? 'white' : 'pen'}
							/>
						</div>
					</Link>
				)
			})}
		</nav>
	)
}

export default AsideMenu;
