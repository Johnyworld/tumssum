import { ChromaticColor, Color } from 'types';
import { useDispatch } from '~/hooks';
import { addToast } from '~/stores/toastSlice';


export default () => {

	const dispatch = useDispatch();

	const toast = (message: string, color: ChromaticColor) => {
		dispatch(addToast({ message, color }));
	}

	return toast;
}