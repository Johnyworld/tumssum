import { h, FunctionalComponent } from 'preact';
import { Color, Weight } from 'types';
import ContentEditable from '~components/atoms/ContentEditable';

export interface LabeledContentEditableProps {
	label?: string;
	value: string;
	placeholder: string;
	type?: 'text' | 'number';
	color?: Color;
	weight?: Weight;
	isNumberNegative?: boolean;
	isFocusOnLoad?: boolean;
	isChangeOnBlur?: boolean;
	isHideIcon?: boolean;
	onChange: (value: string) => void;
	onChangeNumberNegative?: (value: boolean) => void;
}

const LabeledContentEditable: FunctionalComponent<LabeledContentEditableProps> = ({ label, value, placeholder, type, color, weight, isNumberNegative, isFocusOnLoad, isChangeOnBlur, isHideIcon, onChange, onChangeNumberNegative }) => {
	return (
		<div class='labeled-content-editable flex flex-align-start'>
			{ label && <p class='content-label'>{label}</p> }
			<ContentEditable
				color={color || 'pencel'}
				class='fluid'
				value={value}
				placeholder={placeholder}
				type={type}
				weight={weight}
				isNumberNegative={isNumberNegative}
				isFocusOnLoad={isFocusOnLoad}
				isChangeOnBlur={isChangeOnBlur}
				isHideIcon={isHideIcon}
				onChange={onChange}	
				onChangeNumberNegative={onChangeNumberNegative}
			/>
		</div>
	)
}

export default LabeledContentEditable;
