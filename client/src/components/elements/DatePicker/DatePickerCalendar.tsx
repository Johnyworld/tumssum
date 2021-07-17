import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import { getCalendar, getMonthDate } from '~utils/calendar';
import { getClassNames } from '~utils/classNames';
import Icon from '../Icon';

interface DatePickerCalendarProps {
	date: string;
	pos: Vec2;
	width: number;
	height: number;
	onChange: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClose: () => void;
}

const DatePickerCalendar: FunctionalComponent<DatePickerCalendarProps> = ({ date, pos, width, height, onChange, onClose }) => {

	const [viewDate, setViewDate] = useState(date);

	const handlePrevMonth = () => {
		setViewDate(getMonthDate(viewDate, -1));
	}

	const handleNextMonth = () => {
		setViewDate(getMonthDate(viewDate, 1));
	}

	const then = new Date(viewDate);
	const Y = then.getFullYear();
	const M = then.getMonth();

	const cal = getCalendar(Y, M, true);

	return (
		<Portal>
			<div class='date-picker-dim' onClick={onClose} />
			<div class='date-picker-board p-small' style={{ height: `${height}px`, width: `${width}px`, top: pos.y - 8, left: pos.x - width/2 }}>
				<div class='flex'>
					<div class='p-small'>
						<p>{viewDate.substr(0, 7)}</p>
					</div>
					<div class='flex'>
						<div class='p-small pointer' onClick={handlePrevMonth}>
							<Icon as='arrowLeft' />
						</div>
						<div class='p-small pointer' onClick={handleNextMonth}>
							<Icon as='arrowRight' />
						</div>
					</div>
				</div>
				{ cal.map(row => (
					<div class='flex'>
						{ row.map(col => (
							<div class={getClassNames([ 'date-picker-board-date', [col.each, 'pointer'] ])} onClick={col.each ? onChange(col.date) : undefined}>
								{col.each || ''}
							</div>
						))}
					</div>
				))}
			</div>
		</Portal>
	)
}

export default DatePickerCalendar;
