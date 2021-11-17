import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import PickerHeader from '~components/molecules/PickerHeader';
import { getCalendar, getDateString, getMonthDate } from '~utils/calendar';
import { c } from '~utils/classNames';
import './DatePicker.scss'

interface DatePickerProps {
	date: string;
	pos: Vec2;
	width: number;
	height: number;
	onChange: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClose: () => void;
}

const DatePicker: FunctionalComponent<DatePickerProps> = ({ date, pos, width, height, onChange, onClose }) => {

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
		<div class='date-picker'>
			<div class='date-picker__dim' onClick={onClose} />
			<div class='date-picker__content' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>

				<PickerHeader
					title={getDateString('ko', { year: Y, month: M })}
					onClickPrev={handlePrevMonth}
					onClickNext={handleNextMonth}
				/>

				<div class='date-picker__calendar'>

					<div class='flex'>
						{[...Array(7)].map((_, i) => (
							<div class='date-picker__day'>
								{t(`day_${i}_short`)}
							</div>
						))}
					</div>

					{ cal.map(row => (
						<div class='flex'>
							{ row.map(col => (
								<div
									class={
										c(
											'date-picker__date',
											[col.each, 'pointer'],
											[today === col.date, '&--today'],
											[date === col.date, '&--selected'],
											[!col.each, '&--hidden'],
										)
									}
									children={col.each || ''}
									onClick={col.each ? onChange(col.date) : undefined}
								/>
							))}
						</div>
					))}
				</div>

				<p class='date-picker__today-button p-regular pointer f-small f-bold'
					onClick={handleToday}
					children={'Today'}
				/>

			</div>
		</div>
	)
}

export default DatePicker;
