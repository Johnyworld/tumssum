import { h, FunctionalComponent } from 'preact';
import Icon from '~components/elements/Icon';
import './MonthSelector.scss';

interface MonthSelectorProps {
	date: string;
	onPrev: () => void;
	onNext: () => void;
}

const MonthSelector: FunctionalComponent<MonthSelectorProps> = ({ date, onPrev, onNext }) => {

	const split = date.split('-');
	const YYYY = split[0];
	const MM = split[1];

	return (
		<div class='month-selector'>

			<div class='month-selector-icon never-drag' onClick={onPrev}>
				<Icon as='arrowLeft' color='pen' />
			</div>

			<h1 class='month-selector-date header-title'>{YYYY}. {MM}</h1>

			<div class='month-selector-icon never-drag' onClick={onNext}>
				<Icon as='arrowRight' color='pen' />
			</div>

		</div>
	)
}

export default MonthSelector;
