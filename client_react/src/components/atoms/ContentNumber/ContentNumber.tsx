import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './ContentNumber.scss';

export interface ContentNumberProps extends DefaultProps {
	value: string | number;
	placeholder: string;
	isNatural?: boolean;
	onChange: (value: number) => void;
}

const ContentNumber: React.FC<ContentNumberProps> = ({ className, style, value, isNatural, placeholder, onChange }) => {

	const ref = useRef<HTMLDivElement>(null);

	const [isNegative, setNegative] = useState(+value < 0 ? true : false);

	const [followingValue, setFollowingValue] = useState(value);

	const setInnerText = useCallback((newValue: string) => {
		if (ref.current) ref.current.innerText = newValue;
	}, []);

	const handleInput: React.FormEventHandler<HTMLDivElement> = useCallback(e => {
		const newValue = e.currentTarget.innerText;
		onChange(isNegative ? -newValue : +newValue);
		setFollowingValue(newValue);
	}, [isNegative]);

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(e => {
		if (!isNatural && ( e.key === '+' || e.key === '=' )) {
			setNegative(false);
			e.preventDefault();
		}
		if (!isNatural && e.key === '-') {
			setNegative(true);
			e.preventDefault();
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			setTimeout(() => ref.current?.blur());
		}
	}, [isNatural]);

	const handleBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(e => {
		const removeCharacters = numberUtil.removeCharacters(ref.current?.innerText || '');
		const addCommas = numberUtil.getComma(removeCharacters);
		onChange(isNegative ? -removeCharacters : +removeCharacters);
		setFollowingValue(addCommas);
		setInnerText(addCommas);
	}, [isNegative]);

	useEffect(() => {
		if (ref.current) setInnerText(numberUtil.removeCharacters(String(value||'')));
	}, []);

	const component = <div
		className={c(
			'content-number',
			[!isNatural && isNegative, 'c-red'],
			[!isNatural && followingValue && isNegative, '&--negative'],
			[!isNatural && followingValue && !isNegative, '&--positive'],
			className
		)}
		style={style}
		contentEditable
		placeholder={placeholder}
		ref={ref}
		onInput={handleInput}
		onKeyDown={handleKeyDown}
		onBlur={handleBlur}
	/>

	return (
		isNatural
		? component

		: <div className='content-number__container'>
				{component}
				<div className='content-number__svg pos-center-y pointer never-drag' onClick={() => setNegative(!isNegative)}>
					{ isNegative
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

export default ContentNumber;
