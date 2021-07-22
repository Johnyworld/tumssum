import { h, FunctionalComponent } from 'preact';
import { Vec2 } from 'types';
import Portal from '~components/Portal';

interface TimePickerTimerProps {
	time: string;
	pos: Vec2;
	width: number;
	height: number;
	onChange: (date: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClose: () => void;
}

const TimePickerTimer: FunctionalComponent<TimePickerTimerProps> = ({ time, pos, width, height, onChange, onClose  }) => {
	return (
		<Portal>
			<div class='date-picker-dim' onClick={onClose} />
			<div class='time-picker-timer p-small' style={{ height: `${height}px`, width: `${width}px`, top: pos.y, left: pos.x }}>
				Hello TimePickerTimer
			</div>
		</Portal>
	)
}

export default TimePickerTimer;
