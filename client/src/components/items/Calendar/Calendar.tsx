import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Card from '~components/elements/Card';
import { DayItem, GrappingCalendarData } from '~hooks/useCalendar';
import { getClassNames } from '~utils/classNames';
import './Calendar.scss';

interface CalendarProps {
	calendar: DayItem[][];
	grapping: GrappingCalendarData | null;
	grappingPos: Vec2;
	onGrap: (id: number) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDrop: (date: string) => () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
}

const Calendar: FunctionalComponent<CalendarProps> = ({ calendar, grapping, grappingPos, onGrap, onDrop, onDragging }) => {
	return (
		<div class='calendar' onMouseMove={onDragging}>

			<div class='calendar-row'>
				{['sun', 'mon', 'tue', 'web', 'thu', 'fri', 'sat'].map(day => (
					<p class='calendar-day'>
						{day}
					</p>
				))}
			</div>
			
			<div class='calendar-container'>
				{ calendar.map(row => (
					<div class='calendar-row'>
						{ row.map(col => {
							const [ hover, setHover ] = useState(false);
							const handleHover = () => setHover(true);
							const handleHoverOut = () => setHover(false);
							return (
								<div class='calendar-col never-drag gap-tiny' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDrop(col.date)}>
									<p class={getClassNames([ 't-right', [!col.isThisMonth, 'c-gray'] ])}>{col.each}</p>
									{grapping && hover && <div class='calendar-col-grapping' />}
									{col.data && col.data.map(item => (
										<Card padding='tiny' onMouseDown={onGrap(item.id)} onClick={() => {}} >
											<p class='f-small f-bold'>{item.title}</p>
											<p class='f-small t-right c-red'>{item.account}</p>
										</Card>
									))}
								</div>
							)
						})}
					</div>	
				))}
			</div>

			{ grapping &&
				<Card padding='small' class='calendar-grapping' style={{ left: grappingPos.x, top: grappingPos.y, width: grapping.width, height: grapping.height }} >
					<p class='f-small f-bold'>{grapping.title}</p>
					<p class='f-small t-right c-red'>{grapping.account}</p>
				</Card>
			}
		</div>
	)
}

export default Calendar;
