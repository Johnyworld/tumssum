import { h, FunctionalComponent } from 'preact';
import { Account } from 'types';
import Modal from '~components/layouts/Modal';

interface ViewAccountModalProps {
	data: Account;
	onClose: () => void;
}

const ViewAccountModal: FunctionalComponent<ViewAccountModalProps> = ({ data, onClose }) => {

	const { title } = data;

	return (
		<Modal.Container>
			<Modal.Header onClose={onClose}>{title}</Modal.Header>
		</Modal.Container>
	)
}

export default ViewAccountModal;
