import { h, FunctionalComponent } from 'preact';
import { Color, DefaultProps, IconType } from 'types';
import { getClassNames } from '~utils/classNames';
import './Icon.scss';

export interface IconProps extends DefaultProps {
	as: IconType;
	size?: 'regular' | 'medium';
	strokeWidth?: number;
	color?: Color;
	onClick?: h.JSX.MouseEventHandler<HTMLDivElement>;
}

export const icons = [
	'arrowLeft',
	'arrowRight',
	'arrowUp',
	'arrowDown',
	'calendar',
	'card',
	'gear',
	'menu',
	'pencel',
	'storage',
	'home',
	'x',
] as const;


const getSVG = (as: IconType, color: Color, strokeWidth: number) => {
	const c = `var(--color-${color})`;
	switch (as) {

		case 'arrowLeft': return <g>
			<path d="M11 1L4 8L11 15" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'arrowRight': return <g>
			<path d="M5 15L12 8L5 1" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'arrowUp': return <g>
			<path d="M15 11L8 4L1 11" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'arrowDown': return <g>
			<path d="M1 5L8 12L15 5" stroke={c} stroke-width={strokeWidth} />
		</g>
		
		case 'calendar': return <g>
			<rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 6L15 6" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'card': return <g>
			<rect x="0.5" y="2.5" width="15" height="11" rx="1.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 10H15" stroke={c} stroke-width={strokeWidth} />
			<circle cx="3" cy="7" r='1' fill={c} />
			<circle cx="6" cy="7" r='1' fill={c} />
		</g>

		case 'gear': return <g>
			<path d="M13.38 8C13.38 7.71 13.35 7.43 13.31 7.15L15.13 5.55L13.63 2.95L11.34 3.72C10.9 3.37 10.4 3.08 9.86 2.87L9.38 0.5H6.38L5.91 2.87C5.37 3.08 4.87 3.37 4.43 3.72L2.14 2.95L0.640005 5.55L2.46 7.15C2.41 7.43 2.38001 7.71 2.38001 8C2.38001 8.29 2.41 8.57 2.45 8.85L0.630005 10.45L2.13001 13.05L4.42 12.28C4.86 12.64 5.36 12.93 5.9 13.13L6.37 15.5H9.37L9.84 13.13C10.38 12.92 10.88 12.63 11.32 12.28L13.61 13.05L15.11 10.45L13.29 8.85C13.35 8.57 13.38 8.29 13.38 8Z" stroke={c} stroke-width={strokeWidth}/>
			<path d="M7.88 10.5C9.26072 10.5 10.38 9.38071 10.38 8C10.38 6.61929 9.26072 5.5 7.88 5.5C6.49929 5.5 5.38 6.61929 5.38 8C5.38 9.38071 6.49929 10.5 7.88 10.5Z" stroke={c} stroke-width={strokeWidth}/>
		</g>

		case 'menu': return <g>
			<path d="M6 3H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 8H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 13H14" stroke={c} stroke-width={strokeWidth} />
			<circle cx="3" cy="3" r={1 + strokeWidth/10} fill={c}/>
			<circle cx="3" cy="8" r={1 + strokeWidth/10} fill={c}/>
			<circle cx="3" cy="13" r={1 + strokeWidth/10} fill={c}/>
		</g>
		
		case 'pencel': return <g>
			<path d="M3 10.5L12 1.5L15 4.5L6 13.5L2 14.5L3 10.5Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M10 3.5L13 6.5" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'storage': return <g>
			<ellipse cx="8" cy="4" rx="6" ry="2" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 7C14 8.10457 11.3137 9 8 9C4.68629 9 2 8.10457 2 7" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 10C14 11.1046 11.3137 12 8 12C4.68629 12 2 11.1046 2 10" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 13C14 14.1046 11.3137 15 8 15C4.68629 15 2 14.1046 2 13" stroke={c} stroke-width={strokeWidth} />
			<path d="M2 4V13M14 4V13" stroke={c} stroke-width={strokeWidth}  />
		</g>

		case 'home': return <g>
			<path d="M1 8L8 2L15 8M3.1 9.5V14.5H12.9V9.5" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'x': return <g>
			<path d="M15 1L1 15" stroke={c} stroke-width={strokeWidth} />
			<path d="M15 15L1 0.999999" stroke={c} stroke-width={strokeWidth} />
		</g>

		default: return null
	}
}


const Icon: FunctionalComponent<IconProps> = ({ class: className, as, size='regular', strokeWidth=1, color='pen', onClick }) => {

	const sizePx = size === 'medium' ? 20 : 16;

	return (
		<div class={getClassNames(['icon-container', 'never-drag', className, [!!onClick, 'pointer'] ])} onClick={onClick} >
			<div class={getClassNames(['icon', `icon-${size}` ])} >
				<svg width={sizePx} height={sizePx} viewBox={`0 0 16 16`} fill="none" xmlns="http://www.w3.org/2000/svg">
					{getSVG(as, color, strokeWidth)}
				</svg>
			</div>
		</div>
	)
}

export default Icon;
