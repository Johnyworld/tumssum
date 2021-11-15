import { h, FunctionalComponent } from 'preact';
import { useMemo } from 'react';
import trigonometricFunctions from '~utils/trigonometricFunctions';
import ClipPathRadius from './ClipPathRadius';
import './PieGraph.scss';

interface PieGraphItem {
	id: string;
	text: string;
	value: number;
}

export interface PieGraphProps {
	data: PieGraphItem[];
	loaded: boolean;
}

export const BASE_RADIUS = 50;
const DONUT_WIDTH = 40; // 1-50
const RADIUS = BASE_RADIUS - DONUT_WIDTH/2;
const DIAMETER = 2 * Math.PI * RADIUS;

const COLORS = [
	'#7455CF',
	'#8d72d7',
	'#BDAAF5',
	'#D5C7FD',
	'#DEE1FF',
	'#AFB8FF',
	'#7B87F4',
	'#5263F6',
	'#C259DC',
	'#D882ED',
	'#F1B8FF',
	'#FBE9FF',
];

const PieGraph: FunctionalComponent<PieGraphProps> = ({ data, loaded }) => {

	const isEmpty = data.length === 0;
	const total = useMemo(() => data.reduce((prev, curr) => prev + curr.value, 0), [data]);
	const acc = useMemo(() => data.reduce((prev, curr) => [...prev, prev[prev.length-1] + curr.value], [0]), [data]);

	return (
		<div class='pie-graph'>
			<svg class='pie-graph__svg' viewBox='0 0 100 100'>
				{ !isEmpty &&
					<defs>
						<ClipPathRadius />
					</defs>
				}

				{ isEmpty &&
					<circle
						cx={BASE_RADIUS}
						cy={BASE_RADIUS}
						r={RADIUS}
						clipPath='url(#container)'
						fill="transparent"
						stroke='var(--color-gray_weak)'
						stroke-width={DONUT_WIDTH}
					/>
				}

				{ !isEmpty && data.map((item, i) => {
					const ratio = item.value / total;
					const strokeLength = DIAMETER * ratio;
					const spaceLength = DIAMETER - strokeLength;
					const offset = (acc[i] / total) * DIAMETER;

					return (
						<circle
							key={item.id}
							cx={BASE_RADIUS}
							cy={BASE_RADIUS}
							r={RADIUS}
							clipPath='url(#container)'
							fill="transparent"
							stroke={COLORS[i % COLORS.length]}
							stroke-width={DONUT_WIDTH}
							stroke-dasharray={`${strokeLength} ${spaceLength}`}
							stroke-dashoffset={-offset.toFixed(2)}
						/>
					)
				})}
			</svg>

			<div class='pie-graph__list'>
				{ isEmpty &&
					<div class='pie-graph__list-item'>
						<p class='pie-graph__empty'>가계부를 입력하세요!</p>
					</div>	
				}

				{ !isEmpty && data.map((item, i) => (
					<div key={item.id} class='pie-graph__list-item'>
						<div class='pie-graph__dash' style={{ backgroundColor: COLORS[i % COLORS.length] }} />
						<p class='pie-graph__text'>{item.text}</p>
					</div>
				))}
			</div>

		</div>
	)
}

export default PieGraph;
