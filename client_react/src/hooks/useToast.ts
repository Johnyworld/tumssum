import { ChromaticColor, Color } from 'types';
import { useDispatch } from '~/utils/reduxHooks';
import { addToast } from '~/stores/toastSlice';


export default function useToast () {

	const dispatch = useDispatch();

	const toast = (message: string, color: ChromaticColor) => {
		dispatch(addToast({ message, color }));
	}

	return toast;
}