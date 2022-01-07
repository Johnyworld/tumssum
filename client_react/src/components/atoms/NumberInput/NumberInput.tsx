import React, { useCallback } from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './NumberInput.scss';

export interface NumberInputProps extends DefaultProps, CommonInputProps {
	value: number | string;
	min: number | false;
	max: number | false;
	onChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {

	const { className, style, name, value, min, max, label, placeholder, fluid, readOnly, required, disabled, onChange } = props;

	const inputProps = { value, placeholder, readOnly, required, disabled }

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		onChange(e.target.value);
	}, []);

	return (
		<div className={c('number-input', className, [fluid, '&--fluid'])}>
			{ label && <label htmlFor={name} className='number-input__label'>{label}</label> }
			<input
				{...inputProps}
				name={name}
				min={min || undefined}
				max={max || undefined}
				className='number-input__box'
				type='number'
				pattern='\d*'
				style={style}
				onChange={handleChange}
			/>
		</div>
	)
}

export default NumberInput;
