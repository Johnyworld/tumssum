import { h, FunctionalComponent } from 'preact';
import { Color } from 'types';
import './Dropdown.scss';

interface DropdownOption {
	id: string | number;
	text: string | number;
	color?: Color;
}

export interface DropdownProps {
	list: DropdownOption[];
	label: string;
	placeholder?: string;
	selected: string | number;
	onChange: h.JSX.GenericEventHandler<HTMLSelectElement>;
}

const Dropdown: FunctionalComponent<DropdownProps> = ({ list, label, placeholder, selected, onChange }) => {
	return (
		<div class='labeled-content-editable flex flex-align-start'>
			<p class='content-label'>{label}</p>			
			<select class='content-box fluid' value={selected} onChange={onChange} >
				{placeholder && <option disabled hidden >{placeholder}</option> }
				{ list.map(item => (
					<option class={item.color ? `c-${item.color}` : ''} selected={selected === item.id} value={item.id}>{item.text}</option>
				))}
			</select>
		</div>
	)
}

export default Dropdown;
