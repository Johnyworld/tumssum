import { h, FunctionalComponent, Ref } from 'preact';
import ContentEditable from '~components/elements/ContentEditable';

export interface LabeledContentEditableProps {
	label: string;
	value: string;
	placeholder: string;
	isFocusOnLoad?: boolean;
	onChange: (value: string) => void;
}

const LabeledContentEditable: FunctionalComponent<LabeledContentEditableProps> = ({ label, value, placeholder, isFocusOnLoad, onChange }) => {
	return (
		<div class='labeled-content-editable flex flex-align-start'>
			<p class='content-label'>{label}</p>			
			<ContentEditable
				color='pencel'
				class='fluid'
				value={value}
				placeholder={placeholder}
				isFocusOnLoad={isFocusOnLoad}
				onChange={onChange}	
			/>
		</div>
	)
}

export default LabeledContentEditable;
