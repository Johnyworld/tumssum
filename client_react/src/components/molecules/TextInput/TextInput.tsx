import React from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import Input from '~/components/atoms/Input';

export interface TextInputProps extends DefaultProps, CommonInputProps {
	value: string;	
	/** give **false** to no-limit */
	maxLength: number | false;
	minLength?: number;
	onChange: (value: string) => void;
}

/**
 * - `maxLength` props가 required 인 이유는, 급하게 개발하더라도 입력을 잊지 않기 위해서 입니다. 사용하지 않으려면 `false` 값을 주세요.
 */
const TextInput: React.FC<TextInputProps> = (props) => {
	return (
		<Input
			{...props}
			maxLength={props.maxLength || undefined}
			type='text'
		/>
	)
}

export default TextInput;
