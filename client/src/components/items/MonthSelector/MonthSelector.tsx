import { h, FunctionalComponent } from 'preact';
import Icon from '~components/elements/Icon';
import './MonthSelector.scss';

interface MonthSelectorProps {
	date: string;
	onChangeDate: (newDate: string) => void;
}

const getMonthDate = (date: string, sum: number) => {
	const then = new Date(date);
	then.setMonth(then.getMonth() + sum);
	return then.toISOString();
}

const MonthSelector: FunctionalComponent<MonthSelectorProps> = ({ date, onChangeDate }) => {

	const split = date.split('-');
	const YYYY = split[0];
	const MM = split[1];

	const handleChangePrev = () => {
		onChangeDate(getMonthDate(date, -1));
	}

	const handleChangeNext = () => {
		onChangeDate(getMonthDate(date, +1));
	}

	return (
		<div class='month-selector'>

			<div class='month-selector-icon never-drag' onClick={handleChangePrev}>
				<Icon as='arrowLeft' color='pen' />
			</div>

			<h1 class='month-selector-date'>{YYYY}. {MM}</h1>

			<div class='month-selector-icon never-drag' onClick={handleChangeNext}>
				<Icon as='arrowRight' color='pen' />
			</div>

		</div>
	)
}

export default MonthSelector;
