import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import { getCalendar, getDateString } from '~utils/calendar';
import { getClassNames } from '~utils/classNames';
import Icon from '../Icon';

interface DatePickerCalendarProps {
	date: Date;
	pos: Vec2;
	width: number;
	height: number;
	onChange: (date: Date) => void;
	onClose: () => void;
}

const DatePickerCalendar: FunctionalComponent<DatePickerCalendarProps> = ({ date, pos, width, height, onChange, onClose }) => {

	const { t } = useTranslation();

	const [viewDate, setViewDate] = useState(date);


	const handleToday = () => {
		setViewDate(new Date());
	}

	const handlePrevMonth = () => {
		const then = date;
		then.setMonth(then.getMonth() - 1);
		setViewDate(then);
	}

	const handleNextMonth = () => {
		const then = date;
		then.setMonth(then.getMonth() + 1);
		setViewDate(then);
	}

	const handleClickADay = (date: string) => () => {
		console.log('===== DatePickerCalendar', new Date(date));
		onChange(new Date(date));
		onClose();
	}


	const now = new Date();
	const today = now.toISOString().substr(0, 10);
	const then = new Date(viewDate);
	const Y = then.getFullYear();
	const M = then.getMonth();

	const cal = getCalendar(Y, M, true);

	return (
		<Portal>
			<div class='date-picker-dim' onClick={onClose} />
			<div class='date-picker-calendar p-small' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>
				<div class='flex'>
					<div class='p-small'>
						<p class='f-large'>
							<span class='f-bold'>
								{getDateString('ko', { year: Y, month: M })}
							</span>
						</p>
					</div>
					<div class='flex'>
						<div class='p-small pointer never-drag' onClick={handlePrevMonth}>
							<Icon as='arrowLeft' />
						</div>
						<div class='p-small pointer never-drag' onClick={handleNextMonth}>
							<Icon as='arrowRight' />
						</div>
					</div>
				</div>

				<div class='flex'>
					{[...Array(7)].map((_, i) => (
						<div class='date-picker-calendar-item c-gray_strong'>
							{t(`day_${i}_short`)}
						</div>
					))}
				</div>

				{ cal.map(row => (
					<div class='flex'>
						{ row.map(col => (
							<div 
								class={getClassNames([ 'date-picker-calendar-item', [col.isThisMonth, 'date-picker-calendar-date'], [col.each, 'pointer'], [today === col.date, 'date-picker-calendar-today'] ])}
								children={col.each || ''}
								onClick={col.each ? handleClickADay(col.date) : undefined}
							/>
						))}
					</div>
				))}

				<p
					class='date-picker-calendar-today-button p-regular pointer f-small f-bold'
					onClick={handleToday}
					children={'Today'}
				/>

			</div>
		</Portal>
	)
}

export default DatePickerCalendar;
