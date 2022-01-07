import React from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import Input from '~/components/atoms/Input';

export interface EmailInputProps extends DefaultProps, CommonInputProps {
	value: string;	
	onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {
	return (
		<Input
			{...props}
			type='email'
		/>
	)
}

export default EmailInput;
