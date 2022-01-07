import React, { useCallback } from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './Input.scss';

export interface InputProps extends DefaultProps, CommonInputProps {
	value: string | number;
	type?: 'text' | 'number' | 'email';
	pattern?: string;
	min?: number;
	max?: number;
	maxLength?: number;
	minLength?: number;
	onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = (props) => {

	const { className, style, name, value, type, pattern, min, max, maxLength, minLength, label, placeholder, fluid, readOnly, required, disabled, onChange } = props;

	const inputProps = { value, type, pattern, min, max, maxLength, minLength, placeholder, readOnly, required, disabled };

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		onChange(e.target.value);
	}, []);

	return (
		<div className={c('input', className, [fluid, '&--fluid'])}>
			{ label && <label htmlFor={name} className='input__label'>{label}</label> }
			<input
				{...inputProps}
				name={name}
				className='input__box'
				type={type || 'text'}
				style={style}
				onChange={handleChange}
			/>
		</div>
	)
}

export default Input;
