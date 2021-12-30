import { h, FunctionalComponent } from 'preact';
import Icon from '~components/atoms/Icon';
import MonthPicker from '~components/organisms/MonthPicker';
import Portal from '~components/Portal';
import useMiniPopup from '~hooks/useMiniPopup';
import './MonthSelector.scss';

interface MonthSelectorProps {
	date: string;
	today: string;
	onChange: (yyyymm: string) => void;
	onPrev: () => void;
	onNext: () => void;
}

const HEIGHT = 168;

const MonthSelector: FunctionalComponent<MonthSelectorProps> = ({ date, today, onChange, onPrev, onNext }) => {

	const [YYYY, MM] = date.split('-');
	const todaySplit = today.split('-');
	const thisYear = +todaySplit[0];
	const thisMonth = +todaySplit[1];

	const {
		pos,
		handleShowPicker,
		handleClosePicker
	} = useMiniPopup({ height: HEIGHT });

	return (
		<div class='month-selector'>

			<div class='month-selector__icon' onClick={onPrev}>
				<Icon as='arrowLeft' color='pen' />
			</div>

			<h2 class='month-selector__date' onClick={handleShowPicker}>{YYYY}. {MM}</h2>

			<div class='month-selector__icon' onClick={onNext}>
				<Icon as='arrowRight' color='pen' />
			</div>

			{ pos &&
				<Portal>
					<MonthPicker
						pos={pos}
						yyyy={+YYYY}
						mm={+MM}
						thisYear={thisYear}
						thisMonth={thisMonth}
						height={HEIGHT}
						onChange={onChange}
						onClose={handleClosePicker}
					/>
				</Portal>
			}

		</div>
	)
}

export default MonthSelector;
