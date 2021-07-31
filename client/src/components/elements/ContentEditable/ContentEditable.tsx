import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
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
	type?: 'text' | 'number';
	isNumberNegative?: boolean;
	isFocusOnLoad?: boolean;
	isOneLine?: boolean;
	onChange: (value: string) => void;
	onChangeNumberNegative?: (value: boolean) => void;
}

const ContentEditable: FunctionalComponent<ContentEditableProps> = ({ class: className, style, styleType='button', value, color, size, weight, type='text', placeholder, isNumberNegative, isFocusOnLoad, isOneLine, onChange, onChangeNumberNegative }) => {

	const ref = useRef<HTMLDivElement>(null);

	const classes = getClassNames([
		'content-editable',
		[value && type === 'number', isNumberNegative ? 'content-editable-negative' : 'content-editable-positive'],
		styleType === 'button' ? 'content-box' : 'content-text',
		className,
		[!!color, `c-${color}`],
		[!!size, `f-${size}`],
		[!!weight, `f-${weight}`],
	]);

	const handleInput: h.JSX.GenericEventHandler<HTMLDivElement> = (e) => {
		onChange(e.currentTarget.innerText);
	}

	const handleKeyDown: h.JSX.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (onChangeNumberNegative && ( e.key === '+' || e.key === '=' )) {
			onChangeNumberNegative && onChangeNumberNegative(false);
			e.preventDefault();
			e.stopImmediatePropagation();
		}
		if (onChangeNumberNegative && e.key === '-') {
			onChangeNumberNegative && onChangeNumberNegative(true);
			e.preventDefault();
			e.stopImmediatePropagation();
		}
		if (e.key === 'Enter') {
			if (e.shiftKey && !isOneLine) return;
			e.preventDefault();
			ref.current.blur();
		}
	}

	const handleBlur: h.JSX.FocusEventHandler<HTMLDivElement> = (e) => {
		if (type === 'number') {
			const removeCharacters = ref.current.innerText.replace(/([^0-9])/gi, "");;
			ref.current.innerText = removeCharacters;
			onChange(removeCharacters);
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
			placeholder={placeholder}
			ref={ref}
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
			children={!ref.current && value ? value : ''}
		/>
	)
}

export default ContentEditable;
