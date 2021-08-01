import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import Icon from '~components/elements/Icon';
import { getClassNames } from '~utils/classNames';

export interface IconTextProps extends DefaultProps {
	icon: IconType;
	text: string;
	color?: Color;
	isHideText?: boolean;
	onClick?: () => void;
}

const IconText: FunctionalComponent<IconTextProps> = ({ class: className, icon, text, color='pen', isHideText, onClick }) => {
	return (
		<div class={getClassNames([ 'icon-text', 'flex', 'flex-start', 'flex-gap-small', className, [!!onClick, 'pointer'] ])} onClick={onClick}>
			<Icon class={'icon-text-icon'} color={color} as={icon} />
			<p class={getClassNames(['icon-text-p t-fit', ` c-${color}`, [isHideText, 'icon-text-p-hide']])}>{text}</p>
		</div>
	)
}

export default IconText;
