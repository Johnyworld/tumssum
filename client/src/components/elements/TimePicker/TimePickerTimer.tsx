import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import { getHoursLimit, getLimit, getLocalString, getMinutesLimit, getZeroNumber } from '~utils/calendar';
import Icon from '../Icon';

interface TimePickerTimerProps {
	
	/** ex) 00:00 */
	time: string;

	pos: Vec2;
	width: number;
	height: number;
	onChange: (time: string) => void;
	onClose: () => void;
}

const TimePickerTimer: FunctionalComponent<TimePickerTimerProps> = ({ time, pos, width, height, onChange, onClose  }) => {

	const [hours, setHours] = useState(time ? +time.split(':')[0] : new Date().getHours());
	const [minutes, setMinutes] = useState(time ? +time.split(':')[1] : new Date().getMinutes());
	const HHMM = getZeroNumber(hours) + ':' + getZeroNumber(minutes)


	const handleClear = () => {
		onChange('');
	}

	const handleConfirm = () => {
		onChange(HHMM);
	}

	// const handleNow = () => {
	// 	setHours(new Date().getHours());
	// 	setMinutes(new Date().getMinutes());
	// }


	const handleChangeHours: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		setHours(getHoursLimit(+e.currentTarget.value));
	}

	const handleChangeMinutes: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		setMinutes(getMinutesLimit(+e.currentTarget.value));
	}

	const handleChangeHoursByNumber = (num: number) => () => {
		setHours(getHoursLimit(hours + num));
	}

	const handleChangeMinutesByNumber = (num: number) => () => {
		setMinutes(getMinutesLimit(minutes + num));
	}


	return (
		<Portal>
			<div class='date-picker-dim' onClick={onClose} />
			<div class='time-picker-timer p-regular' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>

				<div class='flex flex-around'>
					<div class='flex flex-column'>
						<Icon as='arrowUp' onClick={handleChangeHoursByNumber(+1)} />
						<input class='t-center hide-spin' type='number' min={0} max={23} maxLength={2} value={hours} onChange={handleChangeHours} />
						<Icon as='arrowDown' onClick={handleChangeHoursByNumber(-1)} />
					</div>

					<p>:</p>

					<div class='flex flex-column'>
						<Icon as='arrowUp' onClick={handleChangeMinutesByNumber(+1)} />
						<input class='t-center hide-spin' type='number' min={0} max={59} maxLength={2} value={minutes} onChange={handleChangeMinutes} />
						<Icon as='arrowDown' onClick={handleChangeMinutesByNumber(-1)} />
					</div>
				</div>
				<div class='time-picker-timer-buttons f-bold flex'>
					<span class='pointer c-red' onClick={handleClear}>Clear</span>
					<div class='gap-h-tiny'>
						<span class='pointer' onClick={onClose}>Cancel</span>
						<span class='pointer' onClick={handleConfirm}>Ok</span>
					</div>
				</div>
			</div>
		</Portal>
	)
}

export default TimePickerTimer;
