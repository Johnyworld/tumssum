import React from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import Input from '~/components/atoms/Input';

export interface TextInputProps extends DefaultProps, CommonInputProps {
	value: string;	
	minLength: number | false;
	maxLength: number | false;
	onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
	return (
		<Input
			{...props}
			maxLength={props.maxLength || undefined}
			minLength={props.minLength || undefined}
			type='text'
		/>
	)
}

export default TextInput;
