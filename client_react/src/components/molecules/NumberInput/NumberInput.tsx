import React from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import Input from '~/components/atoms/Input';

export interface NumberInputProps extends DefaultProps, CommonInputProps {
	value: number | string;
	min: number | false;
	max: number | false;
	onChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
	return (
		<Input
			{...props}
			min={props.min || undefined}
			max={props.max || undefined}
			type='number'
			pattern='\d*'
		/>
	)
}

export default NumberInput;
