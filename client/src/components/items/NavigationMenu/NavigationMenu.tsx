import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps, IconType, SelectMenuItem } from 'types';
import { getClassNames } from '~utils/classNames';
import IconText from '../IconText';
import './NavigationMenu.scss';


interface NavigationMenuItemInterface extends SelectMenuItem {
	icon: IconType;
	href?: string
}


export interface NavigationMenuProps extends DefaultProps {
	list: NavigationMenuItemInterface[];
	direction?: 'column' | 'row';
	menuItemType?: 'text' | 'box';
	selected?: string;
	onChange?: (selected: string) => void;
}

const NavigationMenu: FunctionalComponent<NavigationMenuProps> = ({ class: className, list, direction='row', menuItemType='text', selected, onChange }) => {
	return (
		<ul class={getClassNames([ 'navigation-menu', `navigation-menu-${direction}`, className ])} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				const content = <IconText
													icon={item.icon}
													text={item.text}
													color={menuItemType === 'box' && isSelected ? 'white' : 'pen'}
												/>

				return (
					<li class={getClassNames([ 'navigation-menu-item', `navigation-menu-item-${menuItemType}`, [isSelected, 'selected'] ])} key={item.id} onClick={onChange ? () => onChange(item.id) : undefined} >
						{ item.href
						 	? <Link href={item.href} class='navigation-menu-item-content'>
									{content}
								</Link>
							: <div class='navigation-menu-item-content'>
									{content}
								</div>
						}
					</li>
				)
			})}
		</ul>
	)
}

export default NavigationMenu;
