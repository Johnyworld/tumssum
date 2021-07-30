import { h, FunctionalComponent } from 'preact';
import { Color, Size, Weight } from 'types';
import { getClassNames } from '~utils/classNames';
import './ContentEditable.scss';

export interface ContentEditableProps {
	styleType?: 'button' | 'transparent';
	placeholder: string;
	color?: Color;
	size?: Size;
	weight?: Weight;
	onChange: h.JSX.GenericEventHandler<HTMLDivElement>;
}

const ContentEditable: FunctionalComponent<ContentEditableProps> = ({ styleType='button', color, size, weight, placeholder, onChange }) => {

	const classes = getClassNames([
		'content-editable',
		`content-editable-${styleType}`,
		[!!color, `c-${color}`],
		[!!size, `f-${size}`],
		[!!weight, `f-${weight}`],
	]);

	return (
		<div class={classes} contentEditable onInput={onChange} placeholder={placeholder} />
	)
}

export default ContentEditable;
