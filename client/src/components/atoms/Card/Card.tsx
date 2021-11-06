import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { DefaultProps } from 'types';
import { c } from '~utils/classNames';
import './Card.scss';

export interface CardProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLDivElement> {
	padding?: 'none' | 'tiny' | 'small' | 'regular';
	hideBorderOnMobile?: boolean;
}


const Card: FunctionalComponent<CardProps> = ({ children, class: className, style, padding='regular', hideBorderOnMobile, onClick, onMouseDown }) => {
	return (
		<div
			style={style}
			class={c( 'card', className, [padding !== 'none', `p-${padding}`], [!!onClick, 'card--hover'], [hideBorderOnMobile, 'card--hide-border'], )}
			onClick={onClick}
			onMouseDown={onMouseDown}
			children={children}
		/>
	)
}

export default Card;
