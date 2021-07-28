import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Modal from '~components/layouts/Modal';
import { getDatetimeString } from '~utils/calendar';

interface ViewAccountModalProps {
	data: Account;
	onDelete: () => void;
	onClose: () => void;
}

const ViewAccountModal: FunctionalComponent<ViewAccountModalProps> = ({ data, onDelete, onClose }) => {

	const { i18n } = useTranslation();
	const { title, datetime, memo, category_title, bank_title } = data;

	const subtexts = [];
	if (category_title) subtexts.push(category_title);
	if (bank_title) subtexts.push(bank_title);


	return (
		<Modal.Container>
			<Modal.XButton onClose={onClose} />
			<Modal.Content padding class='gap-regular'>
				<div>
					<h3>{title}</h3>
					{ subtexts.length > 0 && <p class='c-primary'>{subtexts.join(' | ')}</p> }
				</div>
				<p class='pre c-pencel'>{memo}</p>
				<p class='c-gray'>{getDatetimeString(i18n.language, datetime)}</p>
			</Modal.Content>

			<Modal.Footer padding class='flex flex-align-end'>
				<p class='c-red f-bold' onClick={onDelete}>삭제</p>
				<Button children='수정' />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default ViewAccountModal;
