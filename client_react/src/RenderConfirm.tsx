import ConfirmModal from "./components/organisms/modals/ConfirmModal";
import { useSelector } from "./hooks";
import { useConfirmRender } from "./hooks/useConfirm";
import Portal from "./Portal";

const RenderConfirm: React.FC = () => {

	const message = useSelector(state => state.confirm.message);

	if (!message) return null;

	const { handleConfirm, handleCancel } = useConfirmRender();

	return (
		<Portal>
			<ConfirmModal message={message} onConfirm={handleConfirm} onCancel={handleCancel} />	
		</Portal>
	)
}

export default RenderConfirm;
