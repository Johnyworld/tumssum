import { h, FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import { getClassNames } from '~utils/classNames';
import TimePickerTimer from './TimePickerTimer';

interface TimePickerProps {
	label?: string;

	/** HH:MM */
	time: string;

	fluid?: boolean;

	styleType?: 'contentEditable' | 'input';

	placeholder?: string;

	onChange?: (time: string) => void;
}


const PICKER_HEIGHT = 162;
const PICKER_WIDTH = 200;

const TimePicker: FunctionalComponent<TimePickerProps> = ({ label, time, fluid, styleType, placeholder, onChange }) => {

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

	const handleChange = useCallback((time: string) => {
		onChange && onChange(time);
		setPos(null);
	}, [pos, onChange]);

	return (
		<div class={getClassNames([ 'time-picker', styleType === 'input' ? 'input-container' : 'flex', [fluid, 'fluid'] ])}>

			{ label && <label class={styleType === 'input' ? 'input-label' : 'content-label'}>{label}</label> }

			<div class={`time-picker-input ${styleType === 'input' ? 'input-box' : 'content-box fluid'} flex`} onClick={handleShowPicker}>
				<p class={time ? '' : 'c-gray'}>{time || placeholder}</p>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="8" cy="8" r="7.5" stroke='var(--color-gray_strong)'/>
					<path d="M8 2.5V8.5H12" stroke='var(--color-gray_strong)' stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
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
