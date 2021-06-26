import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { DefaultProps } from 'types';
import './Card.scss';

export interface CardProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLDivElement> {
	padding?: 'none' | 'small' | 'regular';
}

const Card: FunctionalComponent<CardProps> = ({ children, class: className, style, padding='regular' }) => {

	const paddingClassName = padding === 'none' ? '' : `p-${padding}`;

	return (
		<div style={style} class={`card ${className || ''} ${paddingClassName} `.trim()}>
			{children}
		</div>
	)
}

export default Card;
