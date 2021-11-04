import { h, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Color } from 'types';
import Icon from '~components/atoms/Icon';
import { getClassNames } from '~utils/classNames';


interface ToastProps {
	id: number;
	index: number;
	message: string;
	color: Color;
	onRemoveToast: (index: number) => void;
}

const TIMER = 3000;
const TOAST_HEIGHT = 48;
const TOAST_GAP = 8;
const TOAST_MARGIN = 16;

const Toast: FunctionalComponent<ToastProps> = ({ id, index, message, color, onRemoveToast }) => {

	const [count, setCount] = useState(TIMER);
	const [fadeout, setFadeout] = useState(false);

	useEffect(() => {
		if (count < 200 && !fadeout) setFadeout(true);
		if (count < 0) onRemoveToast(id);
		const interval = setInterval(() => setCount(count-10), 10);
		return () => clearInterval(interval);
	}, [count]);

	return (
		<div class={getClassNames([ 'toast-item', `bgc-${color}`, [fadeout, 'toast-item--fadeout']])} style={{ top: index*(TOAST_HEIGHT + TOAST_GAP) + TOAST_MARGIN }}>
			<p>{message}</p>
			<Icon as='x' size='small' strokeWidth={1.5} onClick={() => onRemoveToast(id)} />
		</div>
	)
}

export default Toast;
