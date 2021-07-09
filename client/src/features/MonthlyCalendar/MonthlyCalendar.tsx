import { h, FunctionalComponent } from 'preact';
import useCalendar from '~hooks/useCalendar';
import './MonthlyCalendar.scss';

interface MonthlyCalendarProps {

}

const MonthlyCalendar: FunctionalComponent<MonthlyCalendarProps> = ({  }) => {

	const { calendar, handleDrop, handleGrep } = useCalendar();

	return (
		<div class='monthly-calendar'>
			{ calendar.map(row => (
				<div class='monthly-calendar-row'>
					{ row.map(col => (
						<div class='monthly-calendar-col' onMouseDown={handleGrep(col.each)} onMouseUp={handleDrop(col.each)}>
							{col.each}
						</div>
					))}
				</div>	
			))}
		</div>
	)
}

export default MonthlyCalendar;
