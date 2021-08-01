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
	selected?: string;
	onChange?: (selected: string) => void;
}

const NavigationMenu: FunctionalComponent<NavigationMenuProps> = ({ class: className, list, selected, onChange }) => {
	return (
		<nav class={getClassNames([ 'navigation-menu', className ])} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				const content = <div class={getClassNames([ 'navigation-menu-item', [isSelected, 'selected'] ])} onClick={onChange ? () => onChange(item.id) : undefined}>
													<IconText
														icon={item.icon}
														text={item.text}
													/>
												</div>

				return (
					item.href
						? <Link href={item.href} class={getClassNames(['navigation-menu-item-content'])}>
								{content}
							</Link>
						: content
				)
			})}
		</nav>
	)
}

export default NavigationMenu;
