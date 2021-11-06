import { h, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Color } from 'types';
import Icon from '~components/atoms/Icon';
import { c } from '~utils/classNames';
import './Toast.scss';


interface ToastProps {
	id: number;
	index: number;
	message: string;
	color: Color;
	onRemoveToast: (index: number) => void;
}

const TIMER = 5000;
const TOAST_HEIGHT = 48;
const TOAST_GAP = 8;
const TOAST_MARGIN = 16;

const Toast: FunctionalComponent<ToastProps> = ({ id, index, message, color, onRemoveToast }) => {

	const [count, setCount] = useState(TIMER);
	const [fadeout, setFadeout] = useState(false);

	useEffect(() => {
		if (count < 500 && !fadeout) setFadeout(true);
		if (count < 0) onRemoveToast(id);
		const interval = setInterval(() => setCount(count-10), 10);
		return () => clearInterval(interval);
	}, [count]);

	return (
		<div class={c( 'toast', `bgc-${color}`, [fadeout, 'toast--fadeout'])} style={{ top: index*(TOAST_HEIGHT + TOAST_GAP) + TOAST_MARGIN }}>
			<p>{message}</p>
			<Icon as='x' size='small' color='white' strokeWidth={1.5} onClick={() => onRemoveToast(id)} />
		</div>
	)
}

export default Toast;
