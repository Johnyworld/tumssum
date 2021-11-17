import { h, FunctionalComponent } from 'preact';
import Icon from '~components/atoms/Icon';
import './PickerHeader.scss';

export interface PickerHeaderProps {
	title: string | number;
	onClickPrev: () => void;
	onClickNext: () => void;
}

const PickerHeader: FunctionalComponent<PickerHeaderProps> = ({ title, onClickPrev, onClickNext }) => {
	return (
		<div class='picker-header'>
			<p class='f-large'>
				<span class='f-bold'>
					{title}
				</span>
			</p>
			<div class='picker-header__arrows'>
				<div class='picker-header__arrow' onClick={onClickPrev}>
					<Icon as='arrowLeft' />
				</div>
				<div class='picker-header__arrow' onClick={onClickNext}>
					<Icon as='arrowRight' />
				</div>
			</div>
		</div>
	)
}

export default PickerHeader;
