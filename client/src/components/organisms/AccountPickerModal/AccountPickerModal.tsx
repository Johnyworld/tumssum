import { h, FunctionalComponent } from 'preact';
import { Account } from 'types';
import Button from '~components/atoms/Button';
import Card from '~components/atoms/Card';
import Modal from '~components/layouts/Modal';
import useList from '~hooks/useList';

export interface AccountPickerModalProps {
	accounts: Account[];
	onSubmit: (accounts: Account[]) => void;
	onClose: () => void;
}

const AccountPickerModal: FunctionalComponent<AccountPickerModalProps> = ({ accounts, onSubmit, onClose }) => {

	const selectedList = useList<Account>([]);

	const handleSelect = (item: Account) => {
		const exists = selectedList.list.find(it=> it.id === item.id);
		if (!exists) selectedList.handleAdd(item);
	}

	const handleSubmit = () => {
		onSubmit(selectedList.list);
	}

	return (
		<Modal.Container onClose={onClose}>
			<Modal.Header sticky >받기</Modal.Header>
			<Modal.Content>
				<p>추가하고 싶은 데이터를 고른 후, 보내기 버튼을 누르세요.</p>
				{ accounts.map(account => {
					const isSelected = selectedList.list.find(item => item.id === account.id);
					return (
						<Card onClick={() => handleSelect(account)}>
							{isSelected && <p>선택됨</p>}
							<p>{account.datetime}</p>
							<p>{account.title}</p>
							<p>{account.account}</p>
							<p>{account.category_title}</p>
							<p>{account.bank_title}</p>
							<p>{account.memo}</p>
						</Card>
					)
				})}
			</Modal.Content>
			<Modal.Footer sticky padding flexEnd >
				<Button onClick={handleSubmit} children='보내기' />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default AccountPickerModal;
