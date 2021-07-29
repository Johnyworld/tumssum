import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Divider from '~components/elements/Divider';
import Modal from '~components/layouts/Modal';
import { getDatetimeString } from '~utils/calendar';
import { getNumberWithComma } from '~utils/number';

interface ViewAccountModalProps {
	data: Account;
	loading?: boolean;
	onEdit: () => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}


const ViewAccountModal: FunctionalComponent<ViewAccountModalProps> = ({ data, loading, onDelete, onEdit, onClose }) => {

	const { i18n } = useTranslation();
	const { id, title, datetime, memo, category_title, bank_title, account } = data;

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
				<Divider />
				<div>
					<div class='flex'>
						<p />
						<p class={`c-${account < 0 ? 'red' : 'pen'} f-big`}>{account < 0 ? '' : '+ '}{getNumberWithComma(account)}</p>
					</div>
					{ category_title &&
						<div class='flex'>
							<p class='ellipsis'>{category_title} 예산</p>
							<p class='f-big'>10,000</p>
						</div>
					}
					{ bank_title &&
						<div class='flex'>
							<p class='ellipsis'>{bank_title} 잔고</p>
							<p class='f-big'>10,000</p>
						</div>
					}
				</div>
			</Modal.Content>

			<Modal.Footer padding class='flex flex-align-end'>
				<p class='c-red f-bold pointer' onClick={onDelete(id)}>삭제</p>
				<Button disabled={loading} onClick={onEdit} children='수정' />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default ViewAccountModal;
