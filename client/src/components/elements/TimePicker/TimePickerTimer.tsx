import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import { getLocalString, getZeroNumber } from '~utils/calendar';

interface TimePickerTimerProps {
	time: string;
	pos: Vec2;
	width: number;
	height: number;
	onChange: (date: string) => void;
	onClose: () => void;
}

const TimePickerTimer: FunctionalComponent<TimePickerTimerProps> = ({ time, pos, width, height, onChange, onClose  }) => {

	const [viewTime, setViewtime] = useState(time || getLocalString());

	const then = new Date(viewTime);
	const hours = then.getHours();
	const minutes = then.getMinutes();


	const handleRemoveTime = () => {
		onChange('');
	}

	const handleConfirm = () => {
		onChange(viewTime);
	}

	const handleNow = () => {
		setViewtime(getLocalString());
	}

	const handleChangeHour: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		let value = +e.currentTarget.value;
		if ( value < 0 ) value = 0;
		if ( value > 23 ) return
		const then = new Date(viewTime);
		then.setHours(value);
		setViewtime(getLocalString(then));
	}

	const handleChangeMinute: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		let value = +e.currentTarget.value;
		if ( value < 0 ) value = 0;
		if ( value > 59 ) return
		const then = new Date(viewTime);
		then.setMinutes(value);
		setViewtime(getLocalString(then));
	}

	const handlePrevHour = () => {
		const then = new Date(viewTime);
		then.setHours(then.getHours() - 1);
		setViewtime(getLocalString(then));
	}

	const handleNextHour = () => {
		const then = new Date(viewTime);
		then.setHours(then.getHours() + 1);
		setViewtime(getLocalString(then));
	}

	const handlePrevMinute = () => {
		const then = new Date(viewTime);
		then.setMinutes(then.getMinutes() - 1);
		setViewtime(getLocalString(then));
	}

	const handleNextMinute = () => {
		const then = new Date(viewTime);
		then.setMinutes(then.getMinutes() + 1);
		setViewtime(getLocalString(then));
	}


	return (
		<Portal>
			<div class='date-picker-dim' onClick={onClose} />
			<div class='time-picker-timer p-small' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>
				<button onClick={handleNow}>now</button>
				<button onClick={handleRemoveTime}>remove</button>
				<button onClick={handleConfirm}>confirm</button>
				{viewTime}

				<div class='flex flex-around'>
					<div>
						<button onClick={handlePrevHour}>prev</button>
						<input type='number' min={0} max={23} maxLength={2} value={getZeroNumber(hours)} onChange={handleChangeHour} />
						<button onClick={handleNextHour}>next</button>
					</div>

					<div>
						<button onClick={handlePrevMinute}>prev</button>
						<input type='number' min={0} max={59} maxLength={2} value={getZeroNumber(minutes)} onChange={handleChangeMinute} />
						<button onClick={handleNextMinute}>next</button>
					</div>
				</div>
			</div>
		</Portal>
	)
}

export default TimePickerTimer;
