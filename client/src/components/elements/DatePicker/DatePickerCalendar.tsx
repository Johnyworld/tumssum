import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import { getCalendar, getDateString, getMonthDate } from '~utils/calendar';
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

	const { t } = useTranslation();

	const [viewDate, setViewDate] = useState(date);


	const handleToday = () => {
		setViewDate(new Date().toISOString());
	}

	const handlePrevMonth = () => {
		setViewDate(getMonthDate(viewDate, -1));
	}

	const handleNextMonth = () => {
		setViewDate(getMonthDate(viewDate, 1));
	}


	const now = new Date();
	const today = now.toISOString().substr(0, 10);
	const then = new Date(viewDate);
	const Y = then.getFullYear();
	const M = then.getMonth();

	const cal = getCalendar(Y, M, true);

	return (
		<Portal>
			<div class='date-picker__dim' onClick={onClose} />
			<div class='date-picker__calendar p-small' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>
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
						<div class='date-picker__date c-gray_strong'>
							{t(`day_${i}_short`)}
						</div>
					))}
				</div>

				{ cal.map(row => (
					<div class='flex'>
						{ row.map(col => (
							<div
								class={
									getClassNames([
										'date-picker__date',
										[col.each, 'pointer'],
										[today === col.date, 'date-picker__date--today'],
										[viewDate === col.date, 'date-picker__date--selected'],
									])
								}
								children={col.each || ''}
								onClick={col.each ? onChange(col.date) : undefined}
							/>
						))}
					</div>
				))}

				<p
					class='date-picker__today-button p-regular pointer f-small f-bold'
					onClick={handleToday}
					children={'Today'}
				/>

			</div>
		</Portal>
	)
}

export default DatePickerCalendar;
