import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import Icon from '~components/atoms/Icon';
import { c } from '~utils/classNames';
import './IconText.scss';

export interface IconTextProps extends DefaultProps {
	icon: IconType;
	text: string;
	color?: Color;
	direction?: 'row' | 'column';
	isHideTextForMobile?: boolean;
	onClick?: () => void;
}

const IconText: FunctionalComponent<IconTextProps> = ({ class: className, icon, text, color='pen', direction, isHideTextForMobile, onClick }) => {
	return (
		<div class={c( 'icon-text', className, [!!onClick, 'pointer'], [direction==='column', 'icon-text--column'] )} onClick={onClick}>
			<Icon class={'icon-text-icon'} color={color} as={icon} />
			<p class={c('icon-text-p t-fit', ` c-${color}`, [isHideTextForMobile, 'hide-mobile'] )}>{text}</p>
		</div>
	)
}

export default IconText;
