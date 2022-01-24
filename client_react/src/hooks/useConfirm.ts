import { useDispatch } from "~/utils/reduxHooks";
import { closeConfirm, openConfirm } from "~/stores/confirmSlice";

let callback: Function | null = null;

export type ConfirmFunction = (message: string, cb?: Function) => void;

export default function useConfirm () {
	const dispatch = useDispatch();
	const confirm: ConfirmFunction = (message, cb) => {
		callback = cb || null;
		dispatch(openConfirm(message));
	}
	return confirm;
}

export function useConfirmRender () {
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
