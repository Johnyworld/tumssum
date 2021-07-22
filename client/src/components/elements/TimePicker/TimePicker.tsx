import { h, FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import { getClassNames } from '~utils/classNames';
import Icon from '../Icon';
import TimePickerTimer from './TimePickerTimer';

interface TimePickerProps {
	label?: string;

	/** HH:MM */
	time: string;

	fluid?: boolean;

	onChange?: (date: string) => void;
}


const PICKER_HEIGHT = 256;
const PICKER_WIDTH = 200;

const TimePicker: FunctionalComponent<TimePickerProps> = ({ label, time, fluid, onChange }) => {

	const [pos, setPos] = useState<Vec2 | null>(null);

	const handleShowPicker: h.JSX.MouseEventHandler<HTMLDivElement> = (e) => {
		if (pos) {
			setPos(null);

		} else {
			const rect = e.currentTarget.getBoundingClientRect();
			let x = rect.x;
			let y = rect.y + rect.height - 1;
			if ( y + PICKER_HEIGHT > window.innerHeight && y > PICKER_HEIGHT ) {
				y = y - PICKER_HEIGHT - rect.height + 2;
			}
			setPos({ x, y });
		}
	}

	const handleClosePicker = useCallback(() => {
		setPos(null);
	}, [pos]);

	const handleChange = useCallback((date: string) => () => {
		onChange && onChange(date);
		setPos(null);
	}, [pos, onChange]);

	return (
		<div class={getClassNames([ 'time-picker input-container', [fluid, 'input-container-fluid'] ])}>
			{ label && <label class='input-label'>{label}</label> }
			<div class='time-picker-input input-box flex' onClick={handleShowPicker}>
				<p />
				<Icon as='calendar' />
			</div>

			{ pos &&
				<TimePickerTimer
					time={time}
					pos={pos}
					width={PICKER_WIDTH}
					height={PICKER_HEIGHT}
					onChange={handleChange}
					onClose={handleClosePicker}
				/>
			}

		</div>
	)
}

export default TimePicker;
