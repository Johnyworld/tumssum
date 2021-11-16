import { h, FunctionalComponent } from 'preact';
import { IconType } from 'types';
import { c } from '~utils/classNames';
import Icon from '../Icon';
import './ContentClickable.scss';

export interface ContentClickableProps {
	label?: string;
	value?: string;
	placeholder?: string;
	icon?: IconType;
	onClick?: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ContentClickable: FunctionalComponent<ContentClickableProps> = ({ label, value, placeholder, icon, onClick }) => {
	return (
		<div class={c('date-input')}>
			{ label && <label class={'date-input__label'}>{label}</label> }
			<div class={`date-input__content`} onClick={onClick}>
				<p class={'t-nowrap' + (value ? '' : ' c-gray')}>{value || placeholder}</p>
				{ icon && <Icon as={icon} color='gray_strong' /> }
			</div>
		</div>
	)
}

export default ContentClickable;
