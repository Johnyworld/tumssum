import { Color } from "types";
import { addToast } from "~stores/toastSlice";
import { useDispatch } from "~utils/redux/hooks";


export default () => {

	const dispatch = useDispatch();

	const toast = (message: string, color: Color) => {
		dispatch(addToast({ message, color }));
	}

	return toast;
}