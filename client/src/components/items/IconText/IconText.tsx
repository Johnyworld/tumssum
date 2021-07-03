import { h, FunctionalComponent } from 'preact';
import { IconType } from 'types';
import Icon from '~components/elements/Icon';

export interface IconTextProps {
	icon: IconType;
	text: string;
}

const IconText: FunctionalComponent<IconTextProps> = ({ icon, text }) => {
	return (
		<div class='flex flex-inline flex-gap-small'>
			<Icon as={icon} strokeWidth={2} />
			<p class='t-fit f-medium fw-bold'>{text}</p>
		</div>
	)
}

export default IconText;
