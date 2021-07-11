import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import { getClassNames } from '~utils/classNames';
import './Icon.scss';

export interface IconProps extends DefaultProps {
	as: IconType;
	strokeWidth?: number;
	color?: Color;
	onClick?: () => void;
}

export const icons = [
	'arrowLeft',
	'arrowRight',
	'calendar',
	'card',
	'menu',
	'storage',
	'home',
] as const;


const getSVG = (as: IconType, color: Color, strokeWidth: number) => {
	const c = `var(--color-${color})`;
	switch (as) {

		case 'arrowLeft': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11 1L4 8L11 15" stroke={c} stroke-width={strokeWidth} />
		</svg>

		case 'arrowRight': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M5 15L12 8L5 1" stroke={c} stroke-width={strokeWidth} />
		</svg>
		
		case 'calendar': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 6L15 6" stroke={c} stroke-width={strokeWidth} />
		</svg>

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


const Icon: FunctionalComponent<IconProps> = ({ class: className, as, strokeWidth=1, color='pen', onClick }) => {
	return (
		<div class={getClassNames(['icon', className, [!!onClick, 'icon-clickable']])} onClick={onClick}>
			{getSVG(as, color, strokeWidth)}
		</div>
	)
}

export default Icon;