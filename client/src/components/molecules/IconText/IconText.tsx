import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType, Size } from 'types';
import Icon from '~components/atoms/Icon';
import { c } from '~utils/classNames';
import './IconText.scss';

export interface IconTextProps extends DefaultProps {
	icon: IconType;
	text: string | undefined;
	textSize?: Size;
	color?: Color;
	direction?: 'row' | 'column';
	bold?: boolean;
	onClick?: () => void;
}

const IconText: FunctionalComponent<IconTextProps> = ({ class: className, icon, text, textSize, color='pen', direction, bold, onClick }) => {
	return (
		<div class={c('icon-text', className, [!!textSize, `f-${textSize}`], [!!onClick, 'pointer'], [direction==='column', '&--column'] )} onClick={onClick}>
			<Icon class={'icon-text__icon'} color={color} as={icon} strokeWidth={bold ? 2 : 1} />
			{ text && <p class={c('icon-text__text', ` c-${color}`, [bold, 'f-bold'] )}>{text}</p> }
		</div>
	)
}

export default IconText;
