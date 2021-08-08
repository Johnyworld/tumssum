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
	'calendar-today',
	'card',
	'category',
	'download',
	'gear',
	'menu',
	'pencel',
	'plus',
	'plusRounded',
	'storage',
	'time',
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
			<path d="M1 1H15V15H1V1Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 6L15 6" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'calendar-today': return <g>
			<path d="M1 1H15V15H1V1Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 6L15 6" stroke={c} stroke-width={strokeWidth} />
			<path d="M5 10L7 12L11 8" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'card': return <g>
			<rect x="0.5" y="2.5" width="15" height="11" rx="1.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 10H15" stroke={c} stroke-width={strokeWidth} />
			<circle cx="3" cy="7" r='1' fill={c} />
			<circle cx="6" cy="7" r='1' fill={c} />
		</g>

		case 'category': return <g>
			<path d="M1 1H6V6H1V1Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M1 10H6V15H1V10Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M10 1H15V6H10V1Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M10 10H15V15H10V10Z" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'download': return <g>
			<path d="M1 9V14H15V9" stroke={c} stroke-width={strokeWidth} />
			<path d="M4 6L8 10L12 6" stroke={c} stroke-width={strokeWidth} />
			<path d="M8 10L8 2" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'gear': return <g>
			<path d="M13.38 8C13.38 7.71 13.35 7.43 13.31 7.15L15.13 5.55L13.63 2.95L11.34 3.72C10.9 3.37 10.4 3.08 9.86 2.87L9.38 0.5H6.38L5.91 2.87C5.37 3.08 4.87 3.37 4.43 3.72L2.14 2.95L0.640005 5.55L2.46 7.15C2.41 7.43 2.38001 7.71 2.38001 8C2.38001 8.29 2.41 8.57 2.45 8.85L0.630005 10.45L2.13001 13.05L4.42 12.28C4.86 12.64 5.36 12.93 5.9 13.13L6.37 15.5H9.37L9.84 13.13C10.38 12.92 10.88 12.63 11.32 12.28L13.61 13.05L15.11 10.45L13.29 8.85C13.35 8.57 13.38 8.29 13.38 8Z" stroke={c} stroke-width={strokeWidth}/>
			<path d="M7.88 10.5C9.26072 10.5 10.38 9.38071 10.38 8C10.38 6.61929 9.26072 5.5 7.88 5.5C6.49929 5.5 5.38 6.61929 5.38 8C5.38 9.38071 6.49929 10.5 7.88 10.5Z" stroke={c} stroke-width={strokeWidth}/>
		</g>

		case 'menu': return <g>
			<path d="M6 2H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M2 2H3M2 8H3M2 14H3" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 8H14" stroke={c} stroke-width={strokeWidth} />
			<path d="M6 14H14" stroke={c} stroke-width={strokeWidth} />
		</g>
		
		case 'pencel': return <g>
			<path d="M3 10.5L12 1.5L15 4.5L6 13.5L2 14.5L3 10.5Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M10 3.5L13 6.5" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'plus': return <g>
			<path d="M1 8H15" stroke={c} stroke-width={strokeWidth} />
			<path d="M8 1L8 15" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'plusRounded': return <g>
			<path d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z" stroke={c} stroke-width={strokeWidth}/>
			<path d="M4 8H12M8 4V12" stroke={c} stroke-width={strokeWidth}/>
		</g>

		case 'storage': return <g>
			<path d="M14 3C14 4.10457 11.3137 5 8 5C4.68629 5 2 4.10457 2 3C2 1.89543 4.68629 1 8 1C11.3137 1 14 1.89543 14 3Z" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 6.5C14 7.60457 11.3137 8.5 8 8.5C4.68629 8.5 2 7.60457 2 6.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 10C14 11.1046 11.3137 12 8 12C4.68629 12 2 11.1046 2 10" stroke={c} stroke-width={strokeWidth} />
			<path d="M14 13.5C14 14.6046 11.3137 15.5 8 15.5C4.68629 15.5 2 14.6046 2 13.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M2 3V13.5M14 3V13.5" stroke={c} stroke-width={strokeWidth} />
		</g>

		case 'time': return <g>
			<circle cx="8" cy="8" r="7.5" stroke={c} stroke-width={strokeWidth} />
			<path d="M8 2.5V8.5H12" stroke={c} stroke-width={strokeWidth} />
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
