import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import Icon from '~components/atoms/Icon';
import { c } from '~utils/classNames';

export interface IconTextProps extends DefaultProps {
	icon: IconType;
	text: string;
	color?: Color;
	isHideTextForMobile?: boolean;
	onClick?: () => void;
}

const IconText: FunctionalComponent<IconTextProps> = ({ class: className, icon, text, color='pen', isHideTextForMobile, onClick }) => {
	return (
		<div class={c( 'icon-text', 'flex', 'flex-start', 'flex-gap-small', className, [!!onClick, 'pointer'] )} onClick={onClick}>
			<Icon class={'icon-text-icon'} color={color} as={icon} />
			<p class={c('icon-text-p t-fit', ` c-${color}`, [isHideTextForMobile, 'hide-mobile'] )}>{text}</p>
		</div>
	)
}

export default IconText;
