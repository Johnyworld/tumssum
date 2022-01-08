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

	const { className, style, name, value, type, pattern, min, max, maxLength, minLength, label, placeholder, fluid, readOnly, required, disabled, error, errorMessage, onChange } = props;

	const inputProps = { value, type, pattern, min, max, maxLength, minLength, placeholder, readOnly, required, disabled };

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		if (disabled || readOnly) return;
		onChange(e.target.value);
	}, []);

	const classNames = c(
		'input',
		className,
		[fluid, '&--fluid'],
	)

	const boxClassNames = c(
		'input__box',
		[readOnly, '&--readonly'],
		[disabled, '&--disabled'],
		[error, '&--error'],
	)

	return (
		<div className={classNames}>
			{ label && <label htmlFor={name} className={c('input__label', [error, '&--error'])}>{label}</label> }
			<input
				{...inputProps}
				name={name}
				className={boxClassNames}
				type={type || 'text'}
				style={style}
				onChange={handleChange}
			/>
			{error && errorMessage &&
				<p className='input__error-message'>{errorMessage}</p>
			}
		</div>
	)
}

export default Input;
