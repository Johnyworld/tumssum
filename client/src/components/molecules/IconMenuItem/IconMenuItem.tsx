import { h, FunctionalComponent } from 'preact';
import { IconType } from 'types';
import IconText from '../IconText';
import './IconMenuItem.scss';

export interface IconMenuItemProps {
	icon: IconType;
	text: string;
	isSelected: boolean;
	onClick?: () => void;
}

const IconMenuItem: FunctionalComponent<IconMenuItemProps> = ({ icon, text, isSelected, onClick }) => {
	return (
		<div class='icon-menu-item' onClick={onClick}>
			<IconText
				icon={icon}
				text={text}
				textSize='tiny'
				direction='column'
				bold
				isHideTextForMobile
				color={isSelected ? 'pen' : 'gray'}
			/>
		</div>
	)
}

export default IconMenuItem;
