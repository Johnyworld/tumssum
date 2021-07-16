import { h, FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Portal from '~components/Portal';
import Icon from '../Icon';
import './DatePicker.scss';
import DatePickerCalendar from './DatePickerCalendar';


interface DatePickerProps {
	label?: string;

	/** YYYY-MM-DD */
	date?: string;

	onChange?: (date: string) => void;
}


const PICKER_HEIGHT = 250;
const PICKER_WIDTH = 200;


const DatePicker: FunctionalComponent<DatePickerProps> = ({ label, date, onChange }) => {

	const [pos, setPos] = useState<Vec2 | null>(null);

	const handleShowPicker: h.JSX.MouseEventHandler<HTMLDivElement> = (e) => {
		if (pos) {
			setPos(null);

		} else {
			const rect = e.currentTarget.getBoundingClientRect();
			let x = rect.x + rect.width - 16;
			let y = rect.y + rect.height;
			if ( y + PICKER_HEIGHT > window.innerHeight && y > PICKER_HEIGHT ) {
				y = y - PICKER_HEIGHT - rect.height + 16;
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
		<div class='date-picker input-container'>
			{ label && <label class='input-label'>{label}</label> }
			<div class='date-picker-input input-box flex' onClick={handleShowPicker}>
				{date && date?.split('T')[0]}
				<Icon as='calendar' />
			</div>

			{ pos &&
				<DatePickerCalendar
					date={date || new Date().toISOString()}
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

export default DatePicker;
