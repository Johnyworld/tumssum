import { h } from 'preact';
import { Link } from 'preact-router';
import { DefaultProps } from 'types';
import { NavigationMenuItem } from '~hooks/useNavigationMenu';
import { c } from '~utils/classNames';
import IconText from '../IconText';
import './NavigationMenu.scss';


export interface NavigationMenuProps<S> extends DefaultProps {
	list: NavigationMenuItem<S>[];
	selected?: S;
	hideText?: 'always' | 'max-mobile' | 'max-tablet';
	onChange?: (selected: S) => void;
}

const NavigationMenu = <S extends string>({ class: className, list, selected, hideText, onChange }: NavigationMenuProps<S>) => {
	return (
		<nav class={c( 'navigation-menu', className, [hideText, `&--hide-text-${hideText}`] )} >
			{ list.map(item => {
				const isSelected = selected === item.id;
				const content
					= <div class={c('navigation-menu__item', [hideText, `&--hide-text-${hideText}`])} onClick={onChange ? () => onChange(item.id) : undefined}>
							<IconText
								icon={item.icon}
								text={item.text}
								textSize='tiny'
								direction='column'
								bold
								color={isSelected ? 'pen' : 'gray'}
							/>
						</div>

				return (
					item.href
						? <Link href={item.href}>
								{content}
							</Link>
						: content
				)
			})}
		</nav>
	)
}

export default NavigationMenu;
