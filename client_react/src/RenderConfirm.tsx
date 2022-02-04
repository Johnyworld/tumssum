import ConfirmModal from './components/organisms/modals/ConfirmModal';
import { useSelector } from './utils/reduxHooks';
import { useConfirmRender } from './hooks/useConfirm';
import Portal from './utils/Portal';

const RenderConfirm: React.FC = () => {
  const message = useSelector((state) => state.confirm.message);
  const { handleConfirm, handleCancel } = useConfirmRender();

  return !message ? null : (
    <Portal>
      <ConfirmModal message={message} onConfirm={handleConfirm} onCancel={handleCancel} />
    </Portal>
  );
};

export default RenderConfirm;
