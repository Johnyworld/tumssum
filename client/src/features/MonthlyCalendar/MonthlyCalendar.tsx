import { h, FunctionalComponent } from 'preact';
import useCalendar, { CalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import './MonthlyCalendar.scss';

interface MonthlyCalendarProps {

}

const MonthlyCalendar: FunctionalComponent<MonthlyCalendarProps> = ({  }) => {

	const { list, handleUpdate } = useList<CalendarData>([
		{ id: '1', date: '2021-07-10', data: 'data 1' },
		{ id: '2', date: '2021-07-10', data: 'data 2' },
		{ id: '3', date: '2021-07-12', data: 'data 3' },
	]);

	const { calendar, handleDrop, handleGrep } = useCalendar({ data: list, onUpdate: handleUpdate });

	return (
		<div class='monthly-calendar'>
			{ calendar.map(row => (
				<div class='monthly-calendar-row'>
					{ row.map(col => (
						<div class='monthly-calendar-col' onMouseUp={handleDrop(col.date)}>
							{col.each}
							{col.data && col.data.map(item => (
								<div class='monthly-calendar-item' onMouseDown={handleGrep(item.id)} >
									{item.data}
								</div>
							))}
						</div>
					))}
				</div>	
			))}
		</div>
	)
}

export default MonthlyCalendar;
