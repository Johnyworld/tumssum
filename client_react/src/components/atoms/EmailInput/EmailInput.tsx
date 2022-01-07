import React, { useCallback } from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './EmailInput.scss';

export interface EmailInputProps extends DefaultProps, CommonInputProps {
	value: string;	
	onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {

	const { className, style, name, value, label, placeholder, fluid, readOnly, required, disabled, onChange } = props;

	const inputProps = { value, placeholder, readOnly, required, disabled };

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		onChange(e.target.value);
	}, []);

	return (
		<div className={c('email-input', className, [fluid, '&--fluid'])}>
			{ label && <label htmlFor={name} className='email-input__label'>{label}</label> }
			<input
				{...inputProps}
				name={name}
				className='email-input__box'
				type='email'
				style={style}
				onChange={handleChange}
			/>
		</div>
	)
}

export default EmailInput;
