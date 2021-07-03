import { h, FunctionalComponent } from 'preact';
import { Color, IconType } from 'types';
import Icon from '~components/elements/Icon';

export interface IconTextProps {
	icon: IconType;
	text: string;
	color?: Color;
}

const IconText: FunctionalComponent<IconTextProps> = ({ icon, text, color='pen' }) => {
	return (
		<div class='flex flex-inline flex-gap-small'>
			<Icon color={color} as={icon} strokeWidth={2} />
			<p class={'t-fit f-medium fw-bold' + ` c-${color}`}>{text}</p>
		</div>
	)
}

export default IconText;
