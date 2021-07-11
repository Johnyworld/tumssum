import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import Card from '~components/elements/Card';
import useCalendar, { CalendarData, DayItem, GrappingCalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import { getClassNames } from '~utils/classNames';
import './MonthlyCalendar.scss';

interface MonthlyCalendarProps {
	date: string;
}

const MonthlyCalendar: FunctionalComponent<MonthlyCalendarProps> = ({ date }) => {

	const { list, handleUpdate } = useList<CalendarData>([
		{ id: '1', date: '2021-07-10', data: 'data 1' },
		{ id: '2', date: '2021-07-10', data: 'data 2' },
		{ id: '3', date: '2021-07-12', data: 'data 3' },
	]);

	const { calendar, grapping, grappingPos, handleDrop, handleGrap, handleDragging } = useCalendar({
		date,
		data: list,
		onUpdate: handleUpdate
	});

	return (
		<div class='monthly-calendar' onMouseMove={handleDragging}>
			
			{ calendar.map(row => (
				<div class='monthly-calendar-row'>
					{ row.map(col => {
						const [ hover, setHover ] = useState(false);
						const handleHover = () => setHover(true);
						const handleHoverOut = () => setHover(false);
						return (
							<div class='monthly-calendar-col never-drag gap-tiny' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={handleDrop(col.date)}>
								<p class={getClassNames([ 't-right', [!col.isThisMonth, 'transparent-1'] ])}>{col.each}</p>
								{grapping && hover && <div class='monthly-calendar-col-grapping' />}
								{col.data && col.data.map(item => (
									<Card padding='small' onMouseDown={handleGrap(item.id)} onClick={() => {}} >
										{item.data}
									</Card>
								))}
							</div>
						)
					})}
				</div>	
			))}

			{ grapping &&
				<Card padding='small' class='monthly-calendar-grapping' style={{ left: grappingPos.x, top: grappingPos.y, width: grapping.width, height: grapping.height }} >
					{grapping.data}
				</Card>
			}
		</div>
	)
}


export default MonthlyCalendar;
