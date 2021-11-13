import { h, FunctionalComponent } from 'preact';
import Button from '~components/atoms/Button';
import DragDropUploader from '~components/atoms/DragDropUploader';
import Modal from '~components/layouts/Modal';

export interface AccountTSVModalProps {
	onDownload: () => void;
	onUpload: (files: FileList) => void;
	onClose: () => void;
}

const AccountTSVModal: FunctionalComponent<AccountTSVModalProps> = ({ onDownload, onUpload, onClose }) => {
	return (
		<Modal.Container>
			<Modal.XButton onClose={onClose} />
			<Modal.Content padding>
				<DragDropUploader onUpload={onUpload} />	
				<Button onClick={onDownload} children={'Download'} />
			</Modal.Content>
		</Modal.Container>
	)
}

export default AccountTSVModal;
