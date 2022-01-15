import React from 'react';
import Toast from './components/organisms/modals/Toast';
import Portal from './Portal';
import { useDispatch, useSelector } from './utils/reduxHooks';
import { removeToast } from './stores/toastSlice';

const RenderToast: React.FC = () => {

	const toasts = useSelector(state=> state.toast.toasts);
	const dispatch = useDispatch();

	return (
		<Portal>
			<div className='toasts'>
				{ toasts.map(toast=>
					<Toast key={toast.id} toast={toast} onRemove={id => dispatch(removeToast(id))} />
				)}
			</div>
		</Portal>
	)
}

export default RenderToast;
