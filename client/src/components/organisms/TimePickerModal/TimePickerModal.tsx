import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Icon from '~components/atoms/Icon';
import { getHoursLimit, getMinutesLimit } from '~utils/calendar';
import numberUtils from '~utils/numberUtils';
import './TimePickerModal.scss';

export interface TimePickerModalProps {
	
	/** ex) 00:00 */
	time: string;

	pos: Vec2;
	width: number;
	height: number;
	onChange: (time: string) => void;
	onClose: () => void;
}

const TimePickerModal: FunctionalComponent<TimePickerModalProps> = ({ time, pos, width=200, height=162, onChange, onClose  }) => {

	const [hours, setHours] = useState(time ? +time.split(':')[0] : new Date().getHours());
	const [minutes, setMinutes] = useState(time ? +time.split(':')[1] : new Date().getMinutes());
	const HHMM = numberUtils.getZeroNumber(hours) + ':' + numberUtils.getZeroNumber(minutes)


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
		<div class='time-picker'>
			<div class='time-picker__timer p-regular' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>

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

				<div class='time-picker__timer-buttons f-bold flex'>
					<span class='pointer c-red' onClick={handleClear}>Clear</span>
					<div class='gap-mh-tiny'>
						<span class='pointer' onClick={onClose}>Cancel</span>
						<span class='pointer' onClick={handleConfirm}>Ok</span>
					</div>
				</div>

			</div>
		</div>
	)
}

export default TimePickerModal;
