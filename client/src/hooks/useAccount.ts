import { Account } from "types";
import { addAccount, removeAccount, updateAccount } from '~features/account/accountSlice';
import { getLocalString, getLocalStringFromISOString } from '~utils/calendar';
import { useDispatch } from '~utils/redux/hooks';
import { GrappingCalendarData } from './useCalendarData';
import useFetch from "./useFetch";

interface UseAccount {
	grapping: GrappingCalendarData | null;

	handleCloseCreateModal: () => void;
	handleCloseDetails: () => void;

	handleDrop: (date: string) => void;
}

export default ({ grapping, handleCloseCreateModal, handleCloseDetails, handleDrop }: UseAccount) => {

	const dispatch = useDispatch();
	
	const createNewAccount = useFetch<Account>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			dispatch(addAccount(data));
			handleCloseCreateModal();
		}
	});

	const fetchUpdateAccount = useFetch<Account>({
		method: 'PUT',
		url: '/api/account/',
		onSuccess: data => {
			data.datetime = getLocalStringFromISOString(data.datetime)
			dispatch(updateAccount({ id: data.id, data }))
			handleCloseCreateModal();
			handleCloseDetails();
		}
	});

	const deleteAccount = useFetch<number>({
		method: 'DELETE',
		url: '/api/account/',
		onSuccess: data => {
			dispatch(removeAccount(data));
			handleCloseDetails();
		}
	});

	const handleCreateAccount = (title: string, amount: number, datetime: string, memo: string) => {
		if (createNewAccount.loading) return;
		createNewAccount.call({
			title,
			account: amount,
			datetime,
			memo,
		})
	}

	const handleDeleteAccount = (id: number) => () => {
		if (deleteAccount.loading) return;
		deleteAccount.call({
			account_id: id,
		})
	}

	const handleUpdateAccount = (title: string, amount: number, datetime: string, memo: string, id?: number) => {
		if (fetchUpdateAccount.loading) return;
		if (!id) return;
		fetchUpdateAccount.call({
			account_id: id,
			title,
			account: amount,
			datetime,
			memo,
		})
	}

	const handleDropToUpdate = (date: string) => () => {
		if (fetchUpdateAccount.loading || !grapping ) return;
		if (date === grapping.datetime.substr(0, 10)) {
			handleDrop(date);
			return;
		}
		const localtime = getLocalString(new Date(grapping.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		fetchUpdateAccount.call({
			account_id: grapping.id,
			datetime: isoString,
		});
		handleDrop(date);
	}
	
	return {
		handleCreateAccount,
		handleDeleteAccount,
		handleUpdateAccount,
		handleDropToUpdate,
	};
}