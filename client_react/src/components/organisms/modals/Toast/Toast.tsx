import React, { useEffect, useState } from 'react';
import Icon from '~/components/atoms/Icon';
import { ToastItem } from '~/stores/toastSlice';
import { c } from '~/utils/classNames';
import './Toast.scss';


export interface ToastProps {
	toast: ToastItem;
	onRemove: (index: number) => void;
}

const TIMER = 5000;
const TOAST_HEIGHT = 48;
const TOAST_GAP = 8;
const TOAST_MARGIN = 16;

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {

	const { id, index, message, color } = toast;

	const [count, setCount] = useState(TIMER);
	const [fadeout, setFadeout] = useState(false);

	useEffect(() => {
		if (count < 500 && !fadeout) setFadeout(true);
		const interval = setInterval(() => setCount(count-500), 500);
		if (count < 0) {
			onRemove(id);
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [count]);

	return (
		<div className={c( 'toast', `bgc-${color}`, [fadeout, '&--fadeout'])} style={{ top: index*(TOAST_HEIGHT + TOAST_GAP) + TOAST_MARGIN }}>
			<p className='toast__message'>{message}</p>
			<Icon as='x' size='small' color='white' strokeWidth={1.5} onClick={() => onRemove(id)} />
		</div>
	)
}

export default Toast;
