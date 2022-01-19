import React, { useMemo, useRef } from 'react';
import { DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './ContentText.scss';

export interface ContentTextProps extends DefaultProps {
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
}

const ContentText: React.FC<ContentTextProps> = ({ className, style, value, placeholder, onChange, }) => {

	const ref = useRef<HTMLDivElement>(null);

	const defaultValue = useMemo(() => value || '', []);

	const handleInput: React.FormEventHandler<HTMLDivElement> = e => {
		const newValue = e.currentTarget.innerText;
		onChange(newValue);
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setTimeout(() => ref.current?.blur());
		}
	}

	return (
		<div
			className={c( 'content-text', className )}
			style={style}
			contentEditable
			placeholder={placeholder}
			ref={ref}
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			dangerouslySetInnerHTML={{ __html: defaultValue }}
		/>
	)
}

export default ContentText;
