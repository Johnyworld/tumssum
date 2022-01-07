import React, { useCallback } from 'react';
import { DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './EmailInput.scss';

export interface EmailInputProps extends DefaultProps {
	value: string;	
	name?: string;
	label?: string;
	placeholder?: string;
	fluid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	disabled?: boolean;
	forwardRef?: React.Ref<HTMLInputElement>;
	onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {

	const { className, style, value, name, label, placeholder, fluid, readOnly, required, disabled, onChange } = props;

	const inputProps = { value, placeholder, readOnly, required, disabled };
	const inputName = name || 'email-input';

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		onChange(e.target.value);
	}, []);

	return (
		<div className={c('email-input', className, [fluid, '&--fluid'])}>
			{ label && <label htmlFor={inputName} className='email-input__label'>{label}</label> }
			<input
				{...inputProps}
				name={inputName}
				className='email-input__box'
				type='email'
				style={style}
				onChange={handleChange}
			/>
		</div>
	)
}

export default EmailInput;
