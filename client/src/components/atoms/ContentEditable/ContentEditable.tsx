import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Color, DefaultProps, Size, Weight } from 'types';
import { getClassNames } from '~utils/classNames';
import { getNumberWithComma } from '~utils/number';
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
	isHideNumberSign?: boolean;
	isFocusOnLoad?: boolean;
	isOneLine?: boolean;
	isChangeOnBlur?: boolean;
	isHideIcon?: boolean;
	onChange: (value: string) => void;
	onChangeNumberNegative?: (value: boolean) => void;
}

const ContentEditable: FunctionalComponent<ContentEditableProps> = ({ class: className, style, styleType='button', value, color, size, weight, type='text', placeholder, isNumberNegative, isHideNumberSign, isFocusOnLoad, isOneLine, isChangeOnBlur, isHideIcon, onChange, onChangeNumberNegative }) => {

	const [viewValue, setViewValue] = useState(type === 'number' && value ? getNumberWithComma(+value) : value);

	const ref = useRef<HTMLDivElement>(null);

	const classes = getClassNames([
		'content-editable',
		[isOneLine, 't-nowrap'],
		[value && type === 'number' && !isHideNumberSign, isNumberNegative ? 'content-editable--negative' : 'content-editable--positive'],
		styleType === 'button' ? 'content-box' : 'content-text',
		className,
		[!!color, `c-${color}`],
		[!!size, `f-${size}`],
		[!!weight, `f-${weight}`],
	]);


	const handleInput: h.JSX.GenericEventHandler<HTMLDivElement> = (e) => {
		if (!isChangeOnBlur) {
			onChange(e.currentTarget.innerText);
			setViewValue(e.currentTarget.innerText);
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
			const addCommas = getNumberWithComma(+removeCharacters);
			onChange(removeCharacters);
			setViewValue(addCommas);
		} else {
			onChange(e.currentTarget.innerText);
			setViewValue(e.currentTarget.innerText);
		}
	}

	const handleFocus: h.JSX.FocusEventHandler<HTMLDivElement> = (e) => {
		if (type === 'number') {
			const removeCharacters = ref.current.innerText.replace(/([^0-9])/gi, "");;
			onChange(removeCharacters);
			setViewValue(removeCharacters);
		}
	}


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
		onFocus={handleFocus}
		dangerouslySetInnerHTML={{ __html: viewValue || '' }}
	/>

	return (
		!onChangeNumberNegative	
			? content
			: <div class='pos-relative fluid'>
					{content}
					{ !isHideIcon &&
						<div class='content-editable__number-svg pos-center-y pointer never-drag' onClick={handleChangeNumberNegative}>
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
					}
				</div>
	)
}


export default ContentEditable;
