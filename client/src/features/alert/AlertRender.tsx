import { h, FunctionalComponent } from 'preact';
import Button from '~components/atoms/Button';
import Modal from '~components/layouts/Modal';
import Dim from '~components/molecules/Dim';
import Portal from '~components/Portal';
import { useAlertRender } from '~hooks/useAlert';
import { useSelector } from '~utils/redux/hooks';

export interface AlertRenderProps {

}

const AlertRender: FunctionalComponent<AlertRenderProps> = ({  }) => {

	const alert = useSelector(state => state.alert.alert);

	const { handleConfirm } = useAlertRender();

	return (
		alert &&
		<Portal>
			<Dim />
			<Modal.Container>
				<Modal.Content>
					{alert.message}
				</Modal.Content>
				<Modal.Footer flexEnd>
					<Button children='Confirm' onClick={handleConfirm} />
				</Modal.Footer>
			</Modal.Container>
		</Portal>
	)
}

export default AlertRender;
