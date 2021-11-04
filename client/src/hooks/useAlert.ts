import { closeAlert, openAlert } from "~stores/alertSlice";
import { useDispatch } from "~utils/redux/hooks";

let callback: Function | null = null;

export default () => {
	const dispatch = useDispatch();
	const alert = (message: string, cb?: Function) => {
		callback = cb || null;
		dispatch(openAlert({ message }));
	}
	return { alert };
}

export const useAlertRender = () => {
	const dispatch = useDispatch();
	const handleConfirm = () => {
		if (callback) {
			callback();
			callback = null;
			dispatch(closeAlert());
		}
	}
	return { handleConfirm }
}
