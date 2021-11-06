import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps, IconType, SelectMenuItem } from 'types';
import { c } from '~utils/classNames';
import IconText from '../IconText';
import './AsideMenu.scss';


export interface AsideMenuItem extends SelectMenuItem {
	icon: IconType;
	href?: string
}


export interface AsideMenuProps extends DefaultProps {
	list: AsideMenuItem[];
	selected?: string;
	isOpen: boolean;
}

const AsideMenu: FunctionalComponent<AsideMenuProps> = ({ class: className, style, list, selected, isOpen }) => {
	return (
		<nav style={style} class={c( 'aside-menu', className )} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				return (
					<Link key={item.id} href={item.href}>
						<div class={c( 'aside-menu-item', [isOpen, 'aside-menu-item-open'], [isSelected, 'selected'] )}>
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
