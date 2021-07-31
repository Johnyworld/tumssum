import { h, FunctionalComponent } from 'preact';
import { Color, Weight } from 'types';
import ContentEditable from '~components/elements/ContentEditable';

export interface LabeledContentEditableProps {
	label: string;
	value: string;
	placeholder: string;
	type?: 'text' | 'number';
	color?: Color;
	weight?: Weight;
	isNumberNegative?: boolean;
	isFocusOnLoad?: boolean;
	onChange: (value: string) => void;
	onChangeNumberNegative?: (value: boolean) => void;
}

const LabeledContentEditable: FunctionalComponent<LabeledContentEditableProps> = ({ label, value, placeholder, type, color, weight, isNumberNegative, isFocusOnLoad, onChange, onChangeNumberNegative }) => {
	return (
		<div class='labeled-content-editable flex flex-align-start'>
			<p class='content-label'>{label}</p>			
			<ContentEditable
				color={color || 'pencel'}
				class='fluid'
				value={value}
				placeholder={placeholder}
				type={type}
				weight={weight}
				isNumberNegative={isNumberNegative}
				isFocusOnLoad={isFocusOnLoad}
				onChange={onChange}	
				onChangeNumberNegative={onChangeNumberNegative}
			/>
		</div>
	)
}

export default LabeledContentEditable;
