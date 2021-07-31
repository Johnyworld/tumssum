import { StateUpdater } from 'preact/hooks';
import { Account, User } from "types";
import { getLocalString, getLocalStringFromISOString } from '~utils/calendar';
import { GrappingCalendarData } from './useCalendarData';
import useFetch from "./useFetch";

interface UseAccount {
	list: Account[];
	setList: StateUpdater<Account[]>;
	grapping: GrappingCalendarData | null;

	handleCloseCreateModal: () => void;
	handleCloseDetails: () => void;

	handleAdd: (newData: Account) => void;
	handleDrop: (date: string) => void;
	handleUpdate: (index: number, newData: Account) => void;
	handleRemove: (index?: number | undefined) => void;
}

export default ({ list, setList, grapping, handleCloseCreateModal, handleCloseDetails, handleAdd, handleDrop, handleUpdate, handleRemove }: UseAccount) => {
	
	useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		onSuccess: data => {
			setList(data.map(data => {
				data.datetime = getLocalStringFromISOString(data.datetime);
				return data;
			}));
		}
	});	

	const createNewAccount = useFetch<Account>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			handleAdd(data);
			handleCloseCreateModal();
		}
	});

	const updateAccount = useFetch<Account>({
		method: 'PUT',
		url: '/api/account/',
		onSuccess: data => {
			data.datetime = getLocalStringFromISOString(data.datetime)
			handleUpdate(list.findIndex(item => item.id === data.id), data);
			handleCloseCreateModal();
			handleCloseDetails();
		}
	});

	const deleteAccount = useFetch({
		method: 'DELETE',
		url: '/api/account/',
		onSuccess: data => {
			handleRemove(list.findIndex(item => item.id === data));
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
		if (updateAccount.loading) return;
		if (!id) return;
		updateAccount.call({
			account_id: id,
			title,
			account: amount,
			datetime,
			memo,
		})
	}

	const handleDropToUpdate = (date: string) => () => {
		if (updateAccount.loading || !grapping ) return;
		if (date === grapping.datetime.substr(0, 10)) {
			handleDrop(date);
			return;
		}
		const localtime = getLocalString(new Date(grapping.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAccount.call({
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