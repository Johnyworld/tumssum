import { h, FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import TimePickerModal from '~components/organisms/TimePickerModal';
import Portal from '~components/Portal';
import { getClassNames } from '~utils/classNames';
import Icon from '../Icon';

export interface TimePickerProps {
	label?: string;

	/** HH:MM */
	time: string;

	fluid?: boolean;

	styleType?: 'contentEditable' | 'input';

	placeholder?: string;

	isHideIcon?: boolean;

	onChange?: (time: string) => void;
}


const PICKER_HEIGHT = 162;
const PICKER_WIDTH = 200;

const TimePicker: FunctionalComponent<TimePickerProps> = ({ label, time, fluid, styleType, placeholder, isHideIcon, onChange }) => {

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

			<div class={`time-picker__input ${styleType === 'input' ? 'input-box' : 'content-box fluid'}`} onClick={handleShowPicker}>
				<p class={'t-nowrap' + (time ? '' : ' c-gray')}>{time || placeholder}</p>
				{ !isHideIcon &&
					<Icon as='time' color='gray_strong' />
				}
			</div>

			{ pos &&
				<Portal>
					<div class='date-picker__dim' onClick={handleClosePicker} />
					<TimePickerModal
						time={time}
						pos={pos}
						width={PICKER_WIDTH}
						height={PICKER_HEIGHT}
						onChange={handleChange}
						onClose={handleClosePicker}
					/>
				</Portal>
			}

		</div>
	)
}

export default TimePicker;
