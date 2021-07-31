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
	handleDrop: () => void;
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
			data.datetime = getLocalStringFromISOString(data.datetime);
			dispatch(updateAccount({ id: data.id, data }));
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

	const updateAndDrop = (data: Account) => {
		if (!grapping) return;
		dispatch(updateAccount({ id: grapping.id, data }));
		handleDrop();
	}

	const handleDropToUpdateDate = (date: string) => () => {
		if (fetchUpdateAccount.loading || !grapping ) return;
		const datetime = date + 'T' + grapping!.datetime.split('T')[1]
		if (date === grapping.datetime.substr(0, 10)) {
			updateAndDrop({ datetime } as Account);
			return;
		}
		const localtime = getLocalString(new Date(grapping.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAndDrop({ datetime } as Account);
		fetchUpdateAccount.call({
			account_id: grapping.id,
			datetime: isoString,
		});
	}

	const handleDropToUpdateCategory = (categoryId: number | null, categoryTitle: string) => () => {
		if (fetchUpdateAccount.loading || !grapping ) return;
		if (categoryId === grapping.category) {
			updateAndDrop({ category: categoryId, category_title: categoryTitle } as Account);
			return;
		}
		updateAndDrop({ category: categoryId, category_title: categoryTitle } as Account);
		fetchUpdateAccount.call({
			account_id: grapping.id,
			category_id: categoryId,
		});
	}

	return {
		handleCreateAccount,
		handleDeleteAccount,
		handleUpdateAccount,
		handleDropToUpdateDate,
		handleDropToUpdateCategory,
	};
}