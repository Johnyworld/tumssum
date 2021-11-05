import { h, FunctionalComponent } from 'preact';
import Button from '~components/atoms/Button';
import Modal from '~components/layouts/Modal';
import Dim from '~components/molecules/Dim';
import Portal from '~components/Portal';
import { useConfirmRender } from '~hooks/useConfirm';
import { useSelector } from '~utils/redux/hooks';


const ConfirmRender: FunctionalComponent = () => {

	const confirm = useSelector(state => state.confirm.confirm);

	const { handleConfirm, handleCancel } = useConfirmRender();

	return (
		confirm &&
		<Portal>
			<Dim />
			<Modal isOpen={!!confirm} onClose={handleCancel}>
				<Modal.Container>
					<Modal.Content padding>
						{confirm.message}
					</Modal.Content>
					<Modal.Footer flexEnd padding>
						<Button children='Cancel' onClick={handleCancel} color='gray_strong' />
						<Button children='Confirm' onClick={handleConfirm} />
					</Modal.Footer>
				</Modal.Container>
			</Modal>
		</Portal>
	)
}

export default ConfirmRender;
