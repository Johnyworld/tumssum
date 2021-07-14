import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Card.scss';

export interface CardProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLDivElement> {
	padding?: 'none' | 'tiny' | 'small' | 'regular';
	hideMobile?: boolean;
}


const Card: FunctionalComponent<CardProps> = ({ children, class: className, style, padding='regular', hideMobile, onClick, onMouseDown }) => {
	return (
		<div
			style={style}
			class={getClassNames([ 'card', className, [padding !== 'none', `p-${padding}`], [!!onClick, 'card-hover'], [hideMobile, 'hide-mobile'], ])}
			onClick={onClick}
			onMouseDown={onMouseDown}
			children={children}
		/>
	)
}

export default Card;
