import React, { useCallback } from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './TextInput.scss';

export interface TextInputProps extends DefaultProps, CommonInputProps {
	value: string;	
	onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {

	const { className, style, name, value, label, placeholder, fluid, readOnly, required, disabled, onChange } = props;

	const inputProps = { value, placeholder, readOnly, required, disabled };

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		onChange(e.target.value);
	}, []);

	return (
		<div className={c('text-input', className, [fluid, '&--fluid'])}>
			{ label && <label htmlFor={name} className='text-input__label'>{label}</label> }
			<input
				{...inputProps}
				name={name}
				className='text-input__box'
				type='text'
				style={style}
				onChange={handleChange}
			/>
		</div>
	)
}

export default TextInput;
