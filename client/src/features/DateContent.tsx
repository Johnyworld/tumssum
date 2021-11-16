import { h, Fragment, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback } from 'preact/hooks';
import { getDateStringByDateType } from '~utils/calendar';
import Portal from '~components/Portal';
import useMiniPopup from '~hooks/useMiniPopup';
import ContentClickable from '~components/atoms/ContentClickable';
import DatePicker from '~components/organisms/DatePicker/DatePicker';

export interface DateContentProps {
	/** YYYY-MM-DD */
	date?: string;

	label?: string;
	placeholder?: string;
	isHideIcon?: boolean;
	onChange?: (date: string) => void;
}

const PICKER_HEIGHT = 256;
const PICKER_WIDTH = 200;

const DateContent: FunctionalComponent<DateContentProps> = ({ label, date, placeholder, isHideIcon, onChange }) => {
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
				icon={isHideIcon ? undefined : 'calendar'}
				value={date ? getDateStringByDateType(i18n.language, new Date(date)) : undefined}
				placeholder={placeholder}
				onClick={handleShowPicker}
			/>

			{ pos &&
				<Portal>
					<DatePicker
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

export default DateContent;

