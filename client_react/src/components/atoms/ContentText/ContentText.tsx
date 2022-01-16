import React, { useMemo } from 'react';
import { DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './ContentText.scss';

export interface ContentTextProps extends DefaultProps {
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
}

const ContentText: React.FC<ContentTextProps> = ({ className, style, value, placeholder, onChange, }) => {

	const defaultValue = useMemo(() => value, []);

	const handleInput: React.FormEventHandler<HTMLDivElement> = (e) => {
		const newValue = e.currentTarget.innerText;
		onChange(newValue);
	}

	return (
		<div
			className={c( 'content-text', className )}
			style={style}
			contentEditable
			placeholder={placeholder}
			onInput={handleInput}
			dangerouslySetInnerHTML={{ __html: defaultValue }}
		/>
	)
}

export default ContentText;
