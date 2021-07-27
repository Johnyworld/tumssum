import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Account, Vec2 } from 'types';
import { GrappingCalendarData } from '~hooks/useCalendarData';
import { combineCalendarWithData, getCalendar } from '~utils/calendar';
import { getClassNames } from '~utils/classNames';
import AccountItem from '../AccountItem';
import './Calendar.scss';

export interface CalendarProps {
	date: string;
	data?: Account[];
	grapping?: GrappingCalendarData | null;
	grappingPos?: Vec2;
	onGrap?: (id: number) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDrop?: (date: string) => void;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
}

const Calendar: FunctionalComponent<CalendarProps> = ({ date, data, grapping, grappingPos, onGrap, onDrop, onDragging }) => {

	const then = new Date(date);
	const calendar = getCalendar(then.getFullYear(), then.getMonth());
	const calendarWithData = combineCalendarWithData(calendar, data);

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
				{ calendarWithData.map(row => (
					<div class='calendar-row'>
						{ row.map(col => {
							const [ hover, setHover ] = useState(false);
							const handleHover = () => setHover(true);
							const handleHoverOut = () => setHover(false);
							return (
								<div class='calendar-col never-drag gap-tiny' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDrop ? () => onDrop(col.date) : undefined}>
									<p class={getClassNames([ 't-right', [!col.isThisMonth, 'c-gray'] ])}>{col.each}</p>
									{grapping && hover && <div class='calendar-col-grapping' />}
									{col.data && col.data.map(item => (
										<AccountItem
											title={item.title}
											amount={item.account}
											onClick={() => {}}
											onMouseDown={onGrap ? onGrap(item.id) : undefined}
										/>
									))}
								</div>
							)
						})}
					</div>	
				))}
			</div>

			{ grapping && grappingPos &&
				<AccountItem
					title={grapping.title}
					amount={grapping.account}
					class='calendar-grapping'
					style={{ left: grappingPos.x, top: grappingPos.y, width: grapping.width, height: grapping.height }} 
				/>
			}
		</div>
	)
}

export default Calendar;
