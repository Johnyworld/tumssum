import { h, FunctionalComponent } from 'preact';
import { Size } from 'types';

export interface DividerProps {
	text?: string;
	textSize?: Size;
	textPosition?: 'center' | 'left';
}

const Divider: FunctionalComponent<DividerProps> = ({ text, textSize='small', textPosition }) => {
	return (
		text
		? <div class='divider flex flex-gap-regular'>
				{ textPosition !== 'left' && <hr class={`fluid`} /> }
				<p class={`divider-text c-gray f-${textSize} f-bold t-nowrap`}>{text}</p>
				<hr class={`fluid`} />
			</div>

		: <hr class={`divider`} />
	)
}

export default Divider;
