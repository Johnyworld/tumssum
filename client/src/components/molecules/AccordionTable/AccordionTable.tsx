import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Color } from 'types';
import useToggle from '~hooks/useToggle';
import { c } from '~utils/classNames';
import numberUtils from '~utils/numberUtils';
import './AccordionTable.scss';

export interface AccordionTableProps {
	group: [string, number|null, number];
	items?: [string, number|null, number][];
	colors?: (Color | null)[];
	forceOpen?: boolean;
}

interface HeadProps {
	head: (string | null)[];
}

const ITEM_HEIGHT = 32;

const getColorClass = (value: string | number | null, forceColor?: Color | null) => {
	if (value === null) return '';
	if (forceColor) return `c-${forceColor}`;
	if (typeof value === 'number') {
		if ( value === 0 ) return 'c-gray_strong';
		if ( value < 0 ) return 'c-red';
	}
	return '';
}

const AccordionTable: FunctionalComponent<AccordionTableProps> = ({ group, items, colors, forceOpen }) => {

	const toggleOpenItems = useToggle();

	useEffect(() => {
		if (forceOpen) toggleOpenItems.handleOn();
		else toggleOpenItems.handleOff();
	}, [forceOpen]);

	return (
		<div class='accordion-table'>
			<div class={c('accordion-table__row', [!!items, 'pointer'])} onClick={toggleOpenItems.handleToggle}>
				{ group.map((col, i) => {
					return (
						<div class={c('accordion-table__group accordion-table__col', getColorClass(col, colors && colors[i]) )}>
							{typeof col === 'number' ? numberUtils.getNumberWithComma(col) : col}
						</div>
					)
				})}
			</div>
			{ items &&
				<div style={{ height: `${ITEM_HEIGHT * items.length}px` }} class={c('accordion-table__items', [!toggleOpenItems.checked, '&--hide'])}>
					{ items.map(item => (
						<div class='accordion-table__row'>
							{ item.map((col, i) => {
								return (
									<div class={c('accordion-table__item', 'accordion-table__col', getColorClass(col, colors && colors[i]) )}>
										{typeof col === 'number' ? numberUtils.getNumberWithComma(col) : col}
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


const AccordionTableHead: FunctionalComponent<HeadProps> = ({ head }) => {
	return (
		<div class='accordion-table__head accordion-table__row'>
			{ head.map((item, i)=> (
				<div key={i} class='accordion-table__col'>
					{item}
				</div>
			))}
		</div>
	)
}


export default Object.assign(AccordionTable, {
	Head: AccordionTableHead,
});
