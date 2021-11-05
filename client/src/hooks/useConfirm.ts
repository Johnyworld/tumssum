import { closeConfirm, ConfirmType, openConfirm } from "~stores/confirmSlice";
import { useDispatch } from "~utils/redux/hooks";

let callback: Function | null = null;

export default () => {
	const dispatch = useDispatch();
	const confirm = (type: ConfirmType, message: string, cb?: Function) => {
		callback = cb || null;
		dispatch(openConfirm({ type, message }));
	}
	return confirm;
}

export const useConfirmRender = () => {
	const dispatch = useDispatch();
	const handleConfirm = () => {
		if (callback) {
			callback();
			callback = null;
			dispatch(closeConfirm());
		}
	}
	const handleCancel = () => {
		callback = null;
		dispatch(closeConfirm());
	}
	return { handleConfirm, handleCancel }
}
