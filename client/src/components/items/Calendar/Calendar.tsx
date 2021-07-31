import { h, FunctionalComponent } from 'preact';
import { Account, Vec2 } from 'types';
import BoardItem from '~components/elements/BoardItem';
import { GrappingCalendarData } from '~hooks/useCalendarData';
import { combineCalendarWithData, getCalendar } from '~utils/calendar';
import AccountItem from '../AccountItem';
import './Calendar.scss';

export interface CalendarProps {
	date: string;
	data?: Account[];
	grapping?: GrappingCalendarData | null;
	grappingPos?: Vec2 | null;
	onGrap?: (id: number) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate?: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick?: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const Calendar: FunctionalComponent<CalendarProps> = ({ date, data, grapping, grappingPos, onGrap, onDropToUpdate, onDragging, onClick }) => {

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
							return (
								<BoardItem
									title={col.each+''}
									disabled={!col.isThisMonth}
									isGrapping={!!grapping}
									onDropToUpdate={onDropToUpdate && onDropToUpdate(col.date)}
									children={ col.data && col.data.map(item => (
										<AccountItem
											title={item.title}
											amount={item.account}
											onClick={onClick && onClick(item)}
											onMouseDown={onGrap ? onGrap(item.id) : undefined}
										/>
									))}
								/>
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
