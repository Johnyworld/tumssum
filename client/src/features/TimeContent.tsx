import { h, FunctionalComponent, Fragment } from 'preact';
import { useCallback } from 'preact/hooks';
import ContentClickable from '~components/atoms/ContentClickable';
import TimePicker from '~components/organisms/TimePicker';
import Portal from '~components/Portal';
import useMiniPopup from '~hooks/useMiniPopup';

export interface TimePickerProps {
	/** HH:MM */
	time: string;
	
	label?: string;
	placeholder?: string;
	isHideIcon?: boolean;
	onChange?: (time: string) => void;
}


const PICKER_HEIGHT = 162;
const PICKER_WIDTH = 200;

const TimeContent: FunctionalComponent<TimePickerProps> = ({ label, time, placeholder, isHideIcon, onChange }) => {

	const { pos, handleShowPicker, handleClosePicker } = useMiniPopup({ height: PICKER_HEIGHT });

	const handleChange = useCallback((time: string) => {
		onChange && onChange(time);
		handleClosePicker();
	}, [pos, onChange]);

	return (
		<Fragment>

			<ContentClickable
				label={label}
				icon={isHideIcon ? undefined : 'time'}
				value={time}
				placeholder={placeholder}
				onClick={handleShowPicker}
			/>

			{ pos &&
				<Portal>
					<TimePicker
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

export default TimeContent;
