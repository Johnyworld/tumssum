import { h, FunctionalComponent } from 'preact';
import { Color } from 'types';
import './Divider.scss';

export interface DividerProps {
	text?: string;
}

const Divider: FunctionalComponent<DividerProps> = ({ text }) => {
	return (
		text
		? <div class='divider flex'>
				<hr class={`fluid`} />
				<p class='divider-text c-gray font-small f-bold t-nowrap'>{text}</p>
				<hr class={`fluid`} />
			</div>

		: <hr class={`divider`} />
	)
}

export default Divider;
