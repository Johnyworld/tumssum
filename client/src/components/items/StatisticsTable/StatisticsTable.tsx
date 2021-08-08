import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import useToggle from '~hooks/useToggle';
import { getClassNames } from '~utils/classNames';
import { getNumberWithComma } from '~utils/number';
import './StatisticsTable.scss';

export interface StatisticsTableProps {
	group: (string | number)[];
	items?: (string | number)[][];
	forceOpen?: boolean;
}

interface HeadProps {
	head: string[];
}

const ITEM_HEIGHT = 36;

const StatisticsTable: FunctionalComponent<StatisticsTableProps> = ({ children, group, items, forceOpen }) => {

	const toggleOpenItems = useToggle();

	useEffect(() => {
		if (forceOpen) toggleOpenItems.handleOn();
		else toggleOpenItems.handleOff();
	}, [forceOpen]);

	return (
		<div class='statistics-table'>
			<div class={getClassNames(['statistics-table__row', [!!items, 'pointer']])} onClick={toggleOpenItems.handleToggle}>
				{ group.map((col) => {
					return (
						<div class={getClassNames(['statistics-table__group statistics-table__col', [typeof col === 'number' && col < 0, 'c-red']])}>
							{typeof col === 'number' ? getNumberWithComma(col) : col}
						</div>
					)
				})}
			</div>
			{ items &&
				<div style={{ height: `${ITEM_HEIGHT * items.length}px` }} class={getClassNames(['statistics-table__items', [!toggleOpenItems.checked, 'statistics-table__items--hide']])}>
					{ items.map(item => (
						<div class='statistics-table__row'>
							{ item.map(col => {
								return (
									<div class={getClassNames(['statistics-table__item statistics-table__col', [typeof col === 'number' && col < 0, 'c-red']])}>
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
