import { h, FunctionalComponent } from 'preact';
import { Color, IconType } from 'types';
import './Icon.scss';

export interface IconProps {
	as: IconType;
	strokeWidth?: number;
	color?: Color;
}

export const icons = [
	'home',
] as const;


const getSVG = (as: IconType, color: string, strokeWidth: number) => {
	const c = `var(--color-${color})`;
	switch (as) {
		case 'home': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 8L8 2L15 8M3.1 9.5V14.5H12.9V9.5" stroke={c} stroke-width={strokeWidth} />
		</svg>

		default: return null
	}
}


const Icon: FunctionalComponent<IconProps> = ({ as, strokeWidth=1, color='pen' }) => {
	return (
		<div class='icon'>
			{getSVG(as, color, strokeWidth)}
		</div>
	)
}

export default Icon;
