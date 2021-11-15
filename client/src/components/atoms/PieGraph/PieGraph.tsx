import { h, FunctionalComponent } from 'preact';
import { useMemo } from 'react';
import ClipPathRadius from './ClipPathRadius';
import './PieGraph.scss';

interface PieGraphItem {
	id: string;
	text: string;
	value: number;
}

export interface PieGraphProps {
	data: PieGraphItem[];
}

export const BASE_RADIUS = 50;
const DONUT_WIDTH = 50; // 1-50
const RADIUS = BASE_RADIUS - DONUT_WIDTH/2;
const DIAMETER = 2 * Math.PI * RADIUS;

const COLORS = [
	'#8d72d7',
	'#A38BE7',
	'#BDAAF5',
	'#D5C7FD',
	'#E3D9FF',
	'#C0C5F7',
	'#A2AAEE',
	'#818AE1',
	'#5A66D8',
	'#C879DC',
	'#DB98EC',
	'#E4ADF1',
	'#F1C4FC',
];

const PieGraph: FunctionalComponent<PieGraphProps> = ({ data }) => {

	const total = useMemo(() => data.reduce((prev, curr) => prev + curr.value, 0), [data]);
	const acc = useMemo(() => data.reduce((prev, curr) => [...prev, prev[prev.length-1] + curr.value], [0]), [data]);

	return (
		<div class='pie-graph'>
			<svg class='pie-graph__svg' viewBox='0 0 100 100'>
				<defs>
					<ClipPathRadius />
				</defs>

				{ data.map((item, i) => {
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
							stroke-dashoffset={-offset}
						/>
					)
				})}
			</svg>

			<div class='pie-graph__list'>
				{ data.map((item, i) => (
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
