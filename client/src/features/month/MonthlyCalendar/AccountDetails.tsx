import { h, FunctionalComponent } from 'preact';
import { Account } from 'types';
import AccountFormModal from '~components/partials/AccountFormModal';
import ViewAccountModal from '~components/partials/ViewAccountModal';
import useToggle from '~hooks/useToggle';

interface AccountDetailsProps {
	data: Account;
	loading?: boolean;
	onEdit: (title: string, amount: number, datetime: string, id?: number) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}

const AccountDetails: FunctionalComponent<AccountDetailsProps> = ({ data, loading, onEdit, onDelete, onClose }) => {

	const toggleEditMode = useToggle();

	return (
		!toggleEditMode.checked
		? <ViewAccountModal
				data={data}
				loading={loading}
				onEdit={toggleEditMode.handleOn}
				onDelete={onDelete}
				onClose={onClose}
			/>

		: <AccountFormModal
				initialValues={data}
				onConfirm={onEdit}
				onClose={onClose}
				onGoBack={toggleEditMode.handleOff}
			/>
	)
}

export default AccountDetails;
