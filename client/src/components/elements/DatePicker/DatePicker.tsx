import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import { getDateStringByDateType } from '~utils/calendar';
import { getClassNames } from '~utils/classNames';
import DatePickerCalendar from './DatePickerCalendar';
import './DatePicker.scss';
import Icon from '../Icon';


interface DatePickerProps {
	label?: string;

	/** YYYY-MM-DD */
	date?: string;

	fluid?: boolean;

	styleType?: 'contentEditable' | 'input';

	placeholder?: string;

	isHideIcon?: boolean;

	onChange?: (date: string) => void;
}


const PICKER_HEIGHT = 256;
const PICKER_WIDTH = 200;


const DatePicker: FunctionalComponent<DatePickerProps> = ({ label, date, fluid, styleType='contentEditable', placeholder, isHideIcon, onChange }) => {

	const { i18n } = useTranslation();
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
		<div class={getClassNames([ 'date-picker', styleType === 'input' ? 'input-container' : 'flex', [fluid, 'fluid'] ])}>

			{ label && <label class={styleType === 'input' ? 'input-label' : 'content-label'}>{label}</label> }

			<div class={`date-picker__input ${styleType === 'input' ? 'input-box' : 'content-box fluid'}`} onClick={handleShowPicker}>
				<p class={'t-nowrap' + (date ? '' : ' c-gray')}>{date ? getDateStringByDateType(i18n.language, new Date(date)) : placeholder}</p>
				{ !isHideIcon &&
					<Icon as='calendar' color='gray_strong' />
				}
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
