import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import './Card.scss';

export interface CardProps extends JSXInternal.DOMAttributes<HTMLDivElement> {
	class?: string;
	padding?: 'none' | 'small' | 'regular';
}

const Card: FunctionalComponent<CardProps> = ({ children, class: className, padding='regular' }) => {

	const paddingClassName = padding === 'none' ? '' : `p-${padding}`;

	return (
		<div class={`card ${className || ''} ${paddingClassName} `.trim()}>
			{children}
		</div>
	)
}

export default Card;
