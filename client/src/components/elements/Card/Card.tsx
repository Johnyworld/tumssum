import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Card.scss';

export interface CardProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLDivElement> {
	padding?: 'none' | 'small' | 'regular';
	hideMobile?: boolean;
}



const Card: FunctionalComponent<CardProps> = ({ children, class: className, style, padding='regular', hideMobile }) => {
	return (
		<div style={style} class={getClassNames([ 'card', className, [padding !== 'none', `p-${padding}`], [hideMobile, 'hide-mobile'], ])}>
			{children}
		</div>
	)
}

export default Card;
