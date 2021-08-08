import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Color } from 'types';
import useToggle from '~hooks/useToggle';
import { getClassNames } from '~utils/classNames';
import { getNumberWithComma } from '~utils/number';
import './StatisticsTable.scss';

export interface StatisticsTableProps {
	group: [string, number|null, number];
	items?: [string, number|null, number][];
	colors?: (Color | null)[];
	forceOpen?: boolean;
}

interface HeadProps {
	head: string[];
}

const ITEM_HEIGHT = 36;

const getColorClass = (value: string | number | null, forceColor?: Color | null) => {
	if (value === null) return '';
	if (forceColor) return `c-${forceColor}`;
	if (typeof value === 'number') {
		if ( value === 0 ) return 'c-gray_strong';
		if ( value < 0 ) return 'c-red';
	}
	return '';
}

const StatisticsTable: FunctionalComponent<StatisticsTableProps> = ({ group, items, colors, forceOpen }) => {

	const toggleOpenItems = useToggle();

	useEffect(() => {
		if (forceOpen) toggleOpenItems.handleOn();
		else toggleOpenItems.handleOff();
	}, [forceOpen]);

	return (
		<div class='statistics-table'>
			<div class={getClassNames(['statistics-table__row', [!!items, 'pointer']])} onClick={toggleOpenItems.handleToggle}>
				{ group.map((col, i) => {
					return (
						<div class={getClassNames(['statistics-table__group statistics-table__col', getColorClass(col, colors && colors[i]) ])}>
							{typeof col === 'number' ? getNumberWithComma(col) : col}
						</div>
					)
				})}
			</div>
			{ items &&
				<div style={{ height: `${ITEM_HEIGHT * items.length}px` }} class={getClassNames(['statistics-table__items', [!toggleOpenItems.checked, 'statistics-table__items--hide']])}>
					{ items.map(item => (
						<div class='statistics-table__row'>
							{ item.map((col, i) => {
								return (
									<div class={getClassNames(['statistics-table__item statistics-table__col', getColorClass(col, colors && colors[i]) ])}>
										{typeof col === 'number' ? getNumberWithComma(col) : col}
									</div>
								)
							})}
						</div>
					))}
				</div>
			}
		</div>
	)
}


const StatisticsTableHead: FunctionalComponent<HeadProps> = ({ head }) => {
	return (
		<div class='statistics-table__head statistics-table__row'>
			{ head.map((item, i)=> (
				<div key={i} class='statistics-table__col'>
					{item}
				</div>
			))}
		</div>
	)
}


export default Object.assign(StatisticsTable, {
	Head: StatisticsTableHead,
});
