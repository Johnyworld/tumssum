import { h, FunctionalComponent, Ref } from 'preact';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Input.scss';

export interface InputProps extends DefaultProps {
	name: string;	
	type?: 'text' | 'number' | 'email' | 'password',
	label?: string;
	value?: string | number;
	placeholder?: string;
	fluid?: boolean;
	required?: boolean;
	readOnly?: boolean;
	removeAutoComplete?: boolean;
	min?: number;
	max?: number;
	maxLength?: number;
	inputRef?: Ref<HTMLInputElement>
	onChange?: h.JSX.GenericEventHandler<HTMLInputElement>;
}

const Input: FunctionalComponent<InputProps> = ({ children, class: className, style, name, type, label, value, placeholder, fluid, required, readOnly, removeAutoComplete, min, max, maxLength, inputRef, onChange }) => {
	return (
		<div class={getClassNames([ 'input', 'input-container', className, [fluid, 'fluid'] ])}>
			{ label && <label class='input-label'>{label}</label> }
			<input
				class='input-box'
				style={style}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				required={required}
				readOnly={readOnly}
				autoComplete={removeAutoComplete ? 'off' : undefined}
				min={min}
				max={max}
				maxLength={maxLength}
				children={children}
				onChange={onChange}
				ref={inputRef}
			/>
		</div>
	)
}

export default Input;
