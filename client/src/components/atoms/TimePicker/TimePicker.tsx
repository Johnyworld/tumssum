import { h, FunctionalComponent, Fragment } from 'preact';
import { useCallback } from 'preact/hooks';
import TimePickerModal from '~components/organisms/TimePickerModal';
import Portal from '~components/Portal';
import useMiniPopup from '~hooks/useMiniPopup';
import ContentClickable from '../ContentClickable';

export interface TimePickerProps {
	/** HH:MM */
	time: string;
	
	label?: string;
	placeholder?: string;
	onChange?: (time: string) => void;
}


const PICKER_HEIGHT = 162;
const PICKER_WIDTH = 200;

const TimePicker: FunctionalComponent<TimePickerProps> = ({ label, time, placeholder, onChange }) => {

	const { pos, handleShowPicker, handleClosePicker } = useMiniPopup({ height: PICKER_HEIGHT });

	const handleChange = useCallback((time: string) => {
		onChange && onChange(time);
		handleClosePicker();
	}, [pos, onChange]);

	return (
		<Fragment>

			<ContentClickable
				label={label}
				icon='time'
				value={time}
				placeholder={placeholder}
				onClick={handleShowPicker}
			/>

			{ pos &&
				<Portal>
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

		</Fragment>
	)
}

export default TimePicker;
