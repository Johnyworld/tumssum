import { h, FunctionalComponent } from 'preact';
import { Color, IconType } from 'types';
import './Icon.scss';

export interface IconProps {
	as: IconType;
	strokeWidth?: number;
	color?: Color;
}

export const icons = [
	'card',
	'menu',
	'storage',
	'home',
] as const;


const getSVG = (as: IconType, color: string, strokeWidth: number) => {
	const c = `var(--color-${color})`;
	switch (as) {

		case 'card': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="2.5" width="15" height="11" rx="1.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 10H15" stroke={c} stroke-width={strokeWidth} />
			<circle cx="3" cy="7" r='1' fill={c} />
			<circle cx="6" cy="7" r='1' fill={c} />
		</svg>

		case 'menu': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 3H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 8H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 13H14" stroke={c} stroke-width={strokeWidth} />
			<circle cx="3" cy="3" r={1 + strokeWidth/10} fill={c}/>
			<circle cx="3" cy="8" r={1 + strokeWidth/10} fill={c}/>
			<circle cx="3" cy="13" r={1 + strokeWidth/10} fill={c}/>
		</svg>
		

		case 'storage': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<ellipse cx="8" cy="4" rx="6" ry="2" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 7C14 8.10457 11.3137 9 8 9C4.68629 9 2 8.10457 2 7" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 10C14 11.1046 11.3137 12 8 12C4.68629 12 2 11.1046 2 10" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 13C14 14.1046 11.3137 15 8 15C4.68629 15 2 14.1046 2 13" stroke={c} stroke-width={strokeWidth} />
			<path d="M2 4V13M14 4V13" stroke={c} stroke-width={strokeWidth}  />
		</svg>

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
