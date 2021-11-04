import { h, FunctionalComponent } from 'preact';
import Portal from '~components/Portal';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import ToastItem from './Toast';
import { removeToast } from '~stores/toastSlice';
import './Toast.scss';
import useToast from '~hooks/useToast';


const ToastRender: FunctionalComponent = ({  }) => {

	const dispatch = useDispatch();
	const toasts = useSelector(state=> state.toast.toasts);

	return (
		<Portal>
			<div class='toast'>
				{ toasts.map(toast=> (
					<ToastItem
						key={toast.id}
						id={toast.id}
						index={toast.index!}
						message={toast.message + toast.id}
						color={toast.color}
						onRemoveToast={index => dispatch(removeToast(index))}
					/>
				))}
			</div>
		</Portal>
	)
}

export default ToastRender;
