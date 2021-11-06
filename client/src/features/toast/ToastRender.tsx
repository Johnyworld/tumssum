import { h, FunctionalComponent } from 'preact';
import Portal from '~components/Portal';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import ToastItem from './Toast';
import { removeToast } from '~stores/toastSlice';


const ToastRender: FunctionalComponent = () => {

	const dispatch = useDispatch();
	const toasts = useSelector(state=> state.toast.toasts);

	return (
		<Portal>
			<div class='toasts'>
				{ toasts.map(toast=> (
					<ToastItem
						key={toast.id}
						id={toast.id}
						index={toast.index!}
						message={toast.message}
						color={toast.color}
						onRemoveToast={id => dispatch(removeToast(id))}
					/>
				))}
			</div>
		</Portal>
	)
}

export default ToastRender;
