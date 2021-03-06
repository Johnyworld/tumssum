import { useCallback, useState } from "preact/hooks";
import { Account, Month } from "types";
import { addAccount, addAccounts, removeAccount, updateAccount } from '~stores/accountSlice';
import { updateOrAddMonths } from "~stores/monthSlice";
import { getLocalString, getLocalStringFromISOString } from '~utils/calendar';
import { useDispatch } from '~utils/redux/hooks';
import useDetails from "./useSelectItem";
import { grabbingData } from './useDrag';
import useFetch from "./useFetch";
import useToggle from "./useToggle";
import useConfirm from "./useConfirm";
import useToast from "./useToast";

interface UseAccount {
	grabbing: grabbingData<Account> | null;
	handleDrop: () => void;
}

export default ({ grabbing, handleDrop }: UseAccount) => {

	const dispatch = useDispatch();
	const confirm = useConfirm();
	const toast = useToast();

	const [initialValuesForCreate, setInitialValuesForCreate] = useState<Account | null>(null);

	const toggleCreateModal = useToggle();

	const { selectedItem, handleClearSelectedItem, handleSelectItem } = useDetails<Account>();

	
	const postAccount = useFetch<{ account: Account, months?: Month[] }>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			dispatch(addAccount(data.account));
			if (data.months) dispatch(updateOrAddMonths(data.months));
			toggleCreateModal.handleOff();
		}
	});

	const postAccounts = useFetch<{ account: Account, months?: Month[] }[]>({
		method: 'POST',
		url: '/api/accounts/',
		onSuccess: data => {
			for (const item of data) {
				dispatch(addAccount(item.account));
				if (item.months) dispatch(updateOrAddMonths(item.months));
				toggleCreateModal.handleOff();
			}
		}
	});

	const putAccount = useFetch<{ account: Account, months?: Month[] }>({
		method: 'PUT',
		url: '/api/account/',
		onSuccess: data => {
			const account = data.account;
			account.datetime = getLocalStringFromISOString(account.datetime);
			dispatch(updateAccount({ id: account.id, data: account }));
			if (data.months) dispatch(updateOrAddMonths(data.months));
			toggleCreateModal.handleOff();
			handleClearSelectedItem();
		}
	});

	const patchAccount = useFetch<{ account: Account, months?: Month[] }>({
		method: 'PATCH',
		url: '/api/account/',
		onSuccess: data => {
			const account = data.account;
			account.datetime = getLocalStringFromISOString(account.datetime);
			dispatch(updateAccount({ id: account.id, data: account }));
			if (data.months) dispatch(updateOrAddMonths(data.months));
			toggleCreateModal.handleOff();
			handleClearSelectedItem();
		}
	});

	const deleteAccount = useFetch<{ account: number, months?: Month[] }>({
		method: 'DELETE',
		url: '/api/account/',
		onSuccess: data => {
			toast('?????????????????????.', 'green');
			dispatch(removeAccount(data.account));
			if (data.months) dispatch(updateOrAddMonths(data.months));
			handleClearSelectedItem();
		}
	});

	const handleCloseCreateModal = useCallback(() => {
		setInitialValuesForCreate(null);
		toggleCreateModal.handleOff();
	}, []);

	const handleOpenCreateModalWithDate = useCallback((date: string) => () => {
		setInitialValuesForCreate({ datetime: date } as Account);
		toggleCreateModal.handleOn();
	}, []);

	const handleOpenCreateModalWithCategory = useCallback((categoryId: number) => () => {
		setInitialValuesForCreate({ category: categoryId } as Account);
		toggleCreateModal.handleOn();
	}, []);

	const handleCreateAccount = useCallback((accountData: Account) => {
		if (postAccount.loading) return;
		const { id, title, account, datetime, category, bank, to, memo } = accountData;
		postAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
			to,
			memo,
		})
	}, [postAccount.loading]);

	const handleCreateAccounts = useCallback((accounts: Account[]) => {
		if (postAccounts.loading) return;
		postAccounts.call({
			accounts: accounts.map(item=> {
				const [theDate, theTime] = item.datetime.split('T');
				const then = new Date(theDate + 'T' + theTime);
				const datetime = theTime ? then.toISOString() : then.toISOString().substr(0, 10);
				return {
					...item,
					category_id: item.category,
					bank_id: item.bank,
					datetime,
				}
			})
		});
	}, [postAccounts.loading]);

	const handleDeleteAccount = useCallback((id: number) => () => {
		if (deleteAccount.loading) return;
		confirm('?????? ????????????????', () => {
			deleteAccount.call({
				account_id: id,
			})
		});
	}, [deleteAccount.loading]);

	const handleUpdateAccount = useCallback((accountData: Account) => {
		if (putAccount.loading) return;
		const { id, title, account, datetime, category, bank, to, memo } = accountData;
		if (!id) return;
		putAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
			to,
			memo,
		})
	}, [putAccount.loading])

	const handlePatchAccount = useCallback((accountData: Account) => {
		if (patchAccount.loading) return;
		const { id, title, account, datetime, category, bank, memo } = accountData;
		const data: any = { account_id: id }
		if (title) data.title = title;
		if (account) data.account = account;
		if (datetime) data.datetime = datetime;
		if (memo) data.memo = memo;
		if (bank !== undefined) data.bank_id = accountData.bank;
		if (category) data.category_id = accountData.category;
		patchAccount.call(data);
	}, [patchAccount.loading]);

	const updateAndDrop = useCallback((data: Account) => {
		if (!grabbing) return;
		dispatch(updateAccount({ id: grabbing.data.id, data }));
		handleDrop();
	}, [grabbing]);

	const handleDropToUpdateDate = useCallback((date: string) => () => {
		if (patchAccount.loading || !grabbing ) return;
		const grabbingItemDate = grabbing.data.datetime.substr(0, 10);
		const grabbingItemTime = grabbing!.data.datetime.split('T')[1];
		const datetime = date + 'T' + grabbingItemTime;
		if (date === grabbingItemDate) {
			handleDrop();
			return;
		}
		const localtime = getLocalString(new Date(grabbing.data.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAndDrop({ datetime } as Account);
		patchAccount.call({
			account_id: grabbing.data.id,
			datetime: grabbingItemTime ? isoString : isoString.substr(0, 10),
		});
	}, [patchAccount.loading, grabbing]);

	const handleDropToUpdateCategory = useCallback((categoryId: number | null, categoryTitle: string) => () => {
		if (patchAccount.loading || !grabbing ) return;
		if (categoryId === grabbing.data.category) {
			handleDrop();
			return;
		}
		updateAndDrop({ category: categoryId, category_title: categoryTitle } as Account);
		patchAccount.call({
			account_id: grabbing.data.id,
			category_id: categoryId,
		});
	}, [patchAccount.loading, grabbing]);



	return {
		initialValuesForCreate,

		selectedItem,
		handleSelectItem,
		handleClearSelectedItem,

		isOpenCreateModal: toggleCreateModal.checked,
		handleOpenCreateModal: toggleCreateModal.handleOn,
		handleOpenCreateModalWithDate,
		handleOpenCreateModalWithCategory,
		handleCloseCreateModal,

		handleCreateAccount,
		handleCreateAccounts,
		handleDeleteAccount,
		handleUpdateAccount,
		handlePatchAccount,
		handleDropToUpdateDate,
		handleDropToUpdateCategory,
	};
}