import { h, FunctionalComponent, Fragment } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback } from 'preact/hooks';
import { getDateStringByDateType } from '~utils/calendar';
import DatePickerCalendar from './DatePickerCalendar';
import ContentClickable from '../ContentClickable';
import Portal from '~components/Portal';
import useMiniPopup from '~hooks/useMiniPopup';
import './DatePicker.scss';


interface DatePickerProps {
	/** YYYY-MM-DD */
	date?: string;

	label?: string;
	placeholder?: string;
	onChange?: (date: string) => void;
}


const PICKER_HEIGHT = 256;
const PICKER_WIDTH = 200;


const DatePicker: FunctionalComponent<DatePickerProps> = ({ label, date, placeholder, onChange }) => {

	const { i18n } = useTranslation();

	const { pos, handleShowPicker, handleClosePicker } = useMiniPopup({ height: PICKER_HEIGHT });

	const handleChange = useCallback((date: string) => () => {
		onChange && onChange(date);
		handleClosePicker();
	}, [pos, onChange]);

	return (
		<Fragment>

			<ContentClickable
				label={label}
				icon='calendar'
				value={date ? getDateStringByDateType(i18n.language, new Date(date)) : undefined}
				placeholder={placeholder}
				onClick={handleShowPicker}
			/>

			{ pos &&
				<Portal>
					<DatePickerCalendar
						date={date || new Date().toISOString()}
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

export default DatePicker;
