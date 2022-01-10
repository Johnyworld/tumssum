import React from 'react';
import { CommonInputProps, DefaultProps } from 'types';
import Input from '~/components/atoms/Input';

export interface NumberInputProps extends DefaultProps, CommonInputProps {
	value: number | string;
	/** give **false** to no-limit */
	min: number | false;
	/** give **false** to no-limit */
	max: number | false;
	onChange: (value: string) => void;
}

/**
 * - `min`, `max` props가 required 인 이유는, 급하게 개발하더라도 min, max 입력을 잊지 않기 위해서 입니다. 사용하지 않으려면 `false` 값을 주세요.
 */
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
