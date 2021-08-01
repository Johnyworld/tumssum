import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Color, DefaultProps, Size, Weight } from 'types';
import useToggle from '~hooks/useToggle';
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
	isChangeOnBlur?: boolean;
	onChange: (value: string) => void;
	onChangeNumberNegative?: (value: boolean) => void;
}

const ContentEditable: FunctionalComponent<ContentEditableProps> = ({ class: className, style, styleType='button', value, color, size, weight, type='text', placeholder, isNumberNegative, isFocusOnLoad, isOneLine, isChangeOnBlur, onChange, onChangeNumberNegative }) => {

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
		if (!isChangeOnBlur) {
			onChange(e.currentTarget.innerText);
		}
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
			setTimeout(() => ref.current.blur());
		}
	}

	const handleChangeNumberNegative = () => {
		onChangeNumberNegative && onChangeNumberNegative(!isNumberNegative);
	}

	const handleBlur: h.JSX.FocusEventHandler<HTMLDivElement> = (e) => {
		if (type === 'number') {
			const removeCharacters = ref.current.innerText.replace(/([^0-9])/gi, "");;
			ref.current.innerText = removeCharacters;
			onChange(removeCharacters);
		} else {
			onChange(e.currentTarget.innerText);
		}
	}

	useEffect(() => {
		if (ref.current) ref.current.innerText = value || '';
	}, []);

	if (isFocusOnLoad) {
		useEffect(() => {
			if (ref.current) ref.current.focus();
		}, [ref.current]);
	}


	const content = <div
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

	return (
		!onChangeNumberNegative	
			? content
			: <div class='pos-relative fluid'>
					{content}
					<div class='content-editable-number-svg pos-center-y pointer never-drag' onClick={handleChangeNumberNegative}>
						{ isNumberNegative
							? <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M24.5 8C24.5 12.1421 21.1421 15.5 17 15.5H8.5V0.5H17C21.1421 0.5 24.5 3.85786 24.5 8Z" stroke="var(--color-gray_strong)"/>
									<rect x="14" y="7.4" width="6" height="1.2" fill="var(--color-gray)"/>
									<rect x="17.5" y="5" width="6" height="1.2" transform="rotate(90 17.5 5)" fill="var(--color-gray)"/>
									<circle cx="8" cy="8" r="8" fill="var(--color-gray_strong)"/>
									<rect x="5" y="7.4" width="6" height="1.2" fill="var(--color-paper)"/>
								</svg>

							: <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.500001 8C0.500001 3.85786 3.85787 0.500001 8 0.500001L16.5 0.500002L16.5 15.5L8 15.5C3.85786 15.5 0.5 12.1421 0.500001 8Z" stroke="var(--color-gray_strong)"/>
									<rect x="4.99976" y="7.40196" width="6" height="1.2" fill="var(--color-gray)"/>
									<circle cx="16.9998" cy="8.00196" r="8" fill="var(--color-gray_strong)"/>
									<rect x="14" y="7.40186" width="6" height="1.2" fill="var(--color-paper)"/>
									<rect x="17.5" y="5.00196" width="6" height="1.2" transform="rotate(90 17.5 5.00196)" fill="var(--color-paper)"/>
								</svg>
						}
					</div>
				</div>
	)
}


export default ContentEditable;
