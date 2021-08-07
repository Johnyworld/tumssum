import { h, FunctionalComponent } from 'preact';
import { Color } from 'types';
import './Dropdown.scss';

interface DropdownOption {
	id: string | number;
	text: string | number;
	children?: DropdownOption[];
}

export interface DropdownProps {
	list: DropdownOption[];
	label?: string;
	placeholder?: string;
	selected: string | number;
	onChange: h.JSX.GenericEventHandler<HTMLSelectElement>;
}

const Dropdown: FunctionalComponent<DropdownProps> = ({ list, label, placeholder, selected, onChange }) => {
	return (
		<div class='labeled-content-editable flex flex-align-start'>
			{ label && <p class='content-label'>{label}</p> }
			<select class='content-box fluid t-nowrap' value={selected} onChange={onChange} >
				{placeholder && <option disabled hidden >{placeholder}</option> }
				{ list.map(item =>
					item.children
						? <optgroup label={item.text+''}>
								{ item.children.map(child => (
									<option selected={selected === child.id} value={child.id}>{child.text || '이름 없음'}</option>
								))}
							</optgroup>
						: <option selected={selected === item.id} value={item.id}>{item.text || '이름 없음'}</option>
				)}
			</select>
		</div>
	)
}

export default Dropdown;
