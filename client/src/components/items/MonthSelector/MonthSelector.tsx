import { h, FunctionalComponent } from 'preact';

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

	const handleChangePrev = () => {
		onChangeDate(getMonthDate(date, -1));
	}

	const handleChangeNext = () => {
		onChangeDate(getMonthDate(date, +1));
	}

	return (
		<div class='flex'>
			<button children='<' onClick={handleChangePrev} />
			<p>{date}</p>
			<button children='>' onClick={handleChangeNext} />
		</div>
	)
}

export default MonthSelector;
