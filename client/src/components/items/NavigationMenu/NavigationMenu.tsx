import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps, IconType, SelectMenuItem } from 'types';
import { getClassNames } from '~utils/classNames';
import IconText from '../IconText';
import './NavigationMenu.scss';


interface NavigationMenuItemInterface extends SelectMenuItem {
	icon: IconType;
}


export interface NavigationMenuProps extends DefaultProps {
	list: NavigationMenuItemInterface[];
	selected?: string;
}

const NavigationMenu: FunctionalComponent<NavigationMenuProps> = ({ class: className, list, selected }) => {
	return (
		<ul class={getClassNames([ 'navigation-menu', 'gap-small', className ])} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				return (
					<li class={getClassNames([ 'navigation-menu-item', [isSelected, 'selected'] ])} key={item.id} >
						<Link href={`/${item.id === 'home' ? '' : item.id}`}>
							<IconText
								icon='home'
								text={item.text}
								color={isSelected ? 'white' : 'pen'}
							/>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

export default NavigationMenu;
