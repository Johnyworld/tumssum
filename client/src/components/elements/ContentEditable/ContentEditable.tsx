import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Color, DefaultProps, Size, Weight } from 'types';
import { getClassNames } from '~utils/classNames';
import './ContentEditable.scss';

export interface ContentEditableProps extends DefaultProps {
	styleType?: 'button' | 'transparent';
	placeholder: string;
	value?: string;
	color?: Color;
	size?: Size;
	weight?: Weight;
	isFocusOnLoad?: boolean;
	onChange: (value: string) => void;
}

const ContentEditable: FunctionalComponent<ContentEditableProps> = ({ class: className, style, styleType='button', value, color, size, weight, placeholder, isFocusOnLoad, onChange }) => {

	const ref = useRef<HTMLDivElement>(null);

	const classes = getClassNames([
		'content-editable',
		`content-editable-${styleType}`,
		className,
		[!!color, `c-${color}`],
		[!!size, `f-${size}`],
		[!!weight, `f-${weight}`],
	]);

	const handleInput: h.JSX.GenericEventHandler<HTMLDivElement> = (e) => {
		onChange(e.currentTarget.innerText);
	}

	const handleKeyDown: h.JSX.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			ref.current.blur();
		}
	}

	useEffect(() => {
		if (ref.current) ref.current.innerText = value || '';
	}, [])

	if (isFocusOnLoad) {
		useEffect(() => {
			if (ref.current) ref.current.focus();
		}, [ref.current]);
	}

	return (
		<div
			class={classes}
			style={style}
			contentEditable
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			ref={ref}
			children={!ref.current && value ? value : ''}
		/>
	)
}

export default ContentEditable;
