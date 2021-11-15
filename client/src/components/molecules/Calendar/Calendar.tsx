import { h, FunctionalComponent } from 'preact';
import { Account, Vec2 } from 'types';
import BoardItem from '~components/atoms/BoardItem';
import { grabbingData } from '~hooks/useDrag';
import { combineCalendarWithData, getCalendar } from '~utils/calendar';
import AccountItem from '../AccountItem';
import './Calendar.scss';

export interface CalendarProps {
	date: string;
	today: string;
	data?: Account[];
	grabbing?: grabbingData<Account> | null;
	grabbingPos?: Vec2 | null;
	onGrap?: (data: Account) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate?: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick?: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickPlus?: (date: string) => () => void;
}

const Calendar: FunctionalComponent<CalendarProps> = ({ date, today, data, grabbing, grabbingPos, onGrap, onDropToUpdate, onDragging, onClick, onClickPlus }) => {

	const then = new Date(date);
	const calendar = getCalendar(then.getFullYear(), then.getMonth());
	const calendarWithData = combineCalendarWithData(calendar, data);

	console.log('===== Calendar', today, calendarWithData);

	return (
		<div class='calendar' onMouseMove={onDragging}>

			<div class='flex'>
				{['sun', 'mon', 'tue', 'web', 'thu', 'fri', 'sat'].map(day => (
					<p class='calendar__day'>
						{day}
					</p>
				))}
			</div>
			
			<div class='calendar__container'>
				{ calendarWithData.map(row => (
					<div class='calendar__row'>
						{ row.map(col => {
							return (
								<BoardItem
									title={col.each+''}
									disabled={!col.isThisMonth}
									isGrabbing={!!grabbing}
									isFocused={col.isToday || false}
									onDropToUpdate={onDropToUpdate && onDropToUpdate(col.date)}
									onClickPlus={onClickPlus && onClickPlus(col.date)}
									children={ col.data && col.data.map(item => (
										<AccountItem
											title={item.title}
											amount={item.account}
											onClick={onClick && onClick(item)}
											onMouseDown={onGrap ? onGrap(item) : undefined}
										/>
									))}
								/>
							)
						})}
					</div>	
				))}
			</div>

			{ grabbing && grabbingPos &&
				<AccountItem
					title={grabbing.data.title}
					amount={grabbing.data.account}
					class='calendar__grabbing'
					style={{ left: grabbingPos.x, top: grabbingPos.y, width: grabbing.width, height: grabbing.height }} 
				/>
			}
		</div>
	)
}

export default Calendar;
