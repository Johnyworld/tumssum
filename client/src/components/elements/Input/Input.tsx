import { h, FunctionalComponent } from 'preact';
import './Input.scss';

export interface InputProps {
	class?: string;
	containerClass?: string;
	name: string;	
	type?: 'text' | 'number' | 'email' | 'password',
	label?: string;
	value?: string | number;
	placeholder?: string;
	fluid?: boolean;
	required?: boolean;
	readOnly?: boolean;
	onChange?: h.JSX.GenericEventHandler<HTMLInputElement>;
}

const Input: FunctionalComponent<InputProps> = ({ children, class:className, name, containerClass, type, label, value, placeholder, fluid, required, readOnly, onChange }) => {
	return (
		<div class={`input-container ${containerClass || ''} ${fluid ? 'fluid' : ''}`.trim()}>
			<label>{label}</label>
			<input
				class={`input ${className || ''} ${fluid ? 'fluid' : ''}`.trim()}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				required={required}
				readOnly={readOnly}
				children={children}
				onChange={onChange}
			/>
		</div>
	)
}

export default Input;
