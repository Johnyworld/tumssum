import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import useCalendar, { CalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import { getClassNames } from '~utils/classNames';
import './MonthlyCalendar.scss';

interface MonthlyCalendarProps {

}

const MonthlyCalendar: FunctionalComponent<MonthlyCalendarProps> = ({  }) => {

	const { list, handleUpdate } = useList<CalendarData>([
		{ id: '1', date: '2021-07-10', data: 'data 1' },
		{ id: '2', date: '2021-07-10', data: 'data 2' },
		{ id: '3', date: '2021-07-12', data: 'data 3' },
	]);

	const { calendar, grapping, grappingPos, handleDrop, handleGrep, handleDragging } = useCalendar({ data: list, onUpdate: handleUpdate });

	return (
		<div class='monthly-calendar' onMouseMove={handleDragging}>
			{ calendar.map(row => (
				<div class='monthly-calendar-row'>
					{ row.map(col => {
						const [ hover, setHover ] = useState(false);
						return (
							<div class='monthly-calendar-col' onMouseEnter={(e) => setHover(true)} onMouseLeave={() => setHover(false)} onMouseUp={handleDrop(col.date)}>
								{col.each}
								{col.data && col.data.map(item => (
									<div class='monthly-calendar-item p-small' onMouseDown={handleGrep(item.id)} >
										{item.data}
									</div>
								))}
								{grapping && hover && <div class='monthly-calendar-col-grapping' />}
							</div>
						)
					})}
				</div>	
			))}

			{ grapping &&
				<div style={{ left: grappingPos.x, top: grappingPos.y, width: grapping.width, height: grapping.height }} class='monthly-calendar-grapping monthly-calendar-item' >
					{grapping.data}
				</div>
			}
		</div>
	)
}

export default MonthlyCalendar;
