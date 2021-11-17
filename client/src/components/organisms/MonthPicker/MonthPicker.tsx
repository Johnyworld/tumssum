import { h, FunctionalComponent } from 'preact';
import { useState } from 'react';
import { Vec2 } from 'types';
import PickerHeader from '~components/molecules/PickerHeader';
import { getLocalString } from '~utils/calendar';
import { c } from '~utils/classNames';
import numberUtils from '~utils/numberUtils';
import './MonthPicker.scss';

export interface MonthPickerProps {
	pos: Vec2;
	yyyy: number;
	mm: number;
	thisYear: number;
	thisMonth: number;
	height: number;
	onChange: (yyyymm: string) => void;
	onClose: () => void;
}

const MonthPicker: FunctionalComponent<MonthPickerProps> = ({ pos, yyyy, mm, thisYear, thisMonth, height, onChange, onClose }) => {

	const [viewYear, setViewYear] = useState(yyyy);

	const isCurrentYear = thisYear === viewYear;
	const isSelectedYear = yyyy === viewYear;

	const handlePrevMonth = () => {
		setViewYear(viewYear-1);
	}

	const handleNextMonth = () => {
		setViewYear(viewYear+1);
	}

	const handleToday = () => {
		onChange(getLocalString(new Date()).substr(0, 7));
		onClose();
	}

	const handleSelect = (month: number) => {
		onChange(viewYear + '-' + numberUtils.getZeroNumber(month));
		onClose();
	}

	return (
		<div class='month-picker'>
			<div class='month-picker__dim' onClick={onClose} />
			<div class='month-picker__calendar' style={{ height: `${height}px`, top: pos.y, left: pos.x }}>

				<PickerHeader
					title={viewYear}
					onClickPrev={handlePrevMonth}
					onClickNext={handleNextMonth}
				/>

				<div class='month-picker__months'>
					{[...Array(12)].map((_, i)=> (
						<div
							key={i}
							class={
								c(
									'month-picker__month',
									[thisMonth === i+1 && isCurrentYear, '&--this-month'],
									[mm === i+1 && isSelectedYear, '&--selected'],
								)
							}
							children={i+1}	
							onClick={() => handleSelect(i+1)}
						/>
					))}
				</div>

				<p
					class='month-picker__current-button'
					onClick={handleToday}
					children={'Today'}
				/>

			</div>
		</div>
	)
}

export default MonthPicker;
