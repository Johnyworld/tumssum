import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import Icon from '~components/elements/Icon';
import { getClassNames } from '~utils/classNames';

export interface IconTextProps extends DefaultProps {
	icon: IconType;
	text: string;
	color?: Color;
	onClick?: () => void;
}

const IconText: FunctionalComponent<IconTextProps> = ({ class: className, icon, text, color='pen', onClick }) => {
	return (
		<div class={getClassNames([ 'icon-text', 'flex', 'flex-inline', 'flex-gap-small', className ])} onClick={onClick}>
			<Icon class={'icon-text-icon'} color={color} as={icon} />
			<p class={'icon-text-p t-fit' + ` c-${color}`}>{text}</p>
		</div>
	)
}

export default IconText;
