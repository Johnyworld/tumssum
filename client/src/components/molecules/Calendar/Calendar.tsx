import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import { Account, Bank } from 'types';
import BoardItem from '~components/atoms/BoardItem';
import { grabbingData } from '~hooks/useDrag';
import { combineCalendarWithData, getCalendar } from '~utils/calendar';
import AccountItem from '../AccountItem';
import './Calendar.scss';

export interface CalendarProps {
	date: string;
	data?: Account[];
	banks: Bank[]
	grabbing?: grabbingData<Account> | null;
	onGrap?: (data: Account) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate?: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick?: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickPlus?: (date: string) => () => void;
}

const Calendar: FunctionalComponent<CalendarProps> = ({ date, data, banks, grabbing, onGrap, onDropToUpdate, onDragging, onClick, onClickPlus }) => {

	const then = new Date(date);
	const calendar = getCalendar(then.getFullYear(), then.getMonth());
	const calendarWithData = combineCalendarWithData(calendar, data);

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
											data={item}
											banks={banks}
											isTransparent={!!item.to}
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
		</div>
	)
}

export default memo(Calendar);
