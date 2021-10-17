import { useCallback, useState } from "preact/hooks";
import { Account, Month } from "types";
import { addAccount, removeAccount, updateAccount } from '~stores/accountSlice';
import { updateOrAddMonths } from "~stores/monthSlice";
import { getLocalString, getLocalStringFromISOString } from '~utils/calendar';
import { useDispatch } from '~utils/redux/hooks';
import useDetails from "./useSelectItem";
import { GrappingData } from './useDrag';
import useFetch from "./useFetch";
import useToggle from "./useToggle";

interface UseAccount {
	grapping: GrappingData<Account> | null;
	handleDrop: () => void;
}

export default ({ grapping, handleDrop }: UseAccount) => {

	const dispatch = useDispatch();

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
		const { id, title, account, datetime, category, bank, memo } = accountData;
		postAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
			memo,
		})
	}, [postAccount.loading]);

	const handleDeleteAccount = useCallback((id: number) => () => {
		if (deleteAccount.loading) return;
		deleteAccount.call({
			account_id: id,
		})
	}, [deleteAccount.loading]);

	const handleUpdateAccount = useCallback((accountData: Account) => {
		if (putAccount.loading) return;
		const { id, title, account, datetime, category, bank, memo } = accountData;
		if (!id) return;
		putAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
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
		if (!grapping) return;
		dispatch(updateAccount({ id: grapping.data.id, data }));
		handleDrop();
	}, [grapping]);

	const handleDropToUpdateDate = useCallback((date: string) => () => {
		if (patchAccount.loading || !grapping ) return;
		const datetime = date + 'T' + grapping!.data.datetime.split('T')[1]
		if (date === grapping.data.datetime.substr(0, 10)) {
			handleDrop();
			return;
		}
		const localtime = getLocalString(new Date(grapping.data.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAndDrop({ datetime } as Account);
		patchAccount.call({
			account_id: grapping.data.id,
			datetime: isoString,
		});
	}, [patchAccount.loading, grapping]);

	const handleDropToUpdateCategory = useCallback((categoryId: number | null, categoryTitle: string) => () => {
		if (patchAccount.loading || !grapping ) return;
		if (categoryId === grapping.data.category) {
			handleDrop();
			return;
		}
		updateAndDrop({ category: categoryId, category_title: categoryTitle } as Account);
		patchAccount.call({
			account_id: grapping.data.id,
			category_id: categoryId,
		});
	}, [patchAccount.loading, grapping]);

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
		handleDeleteAccount,
		handleUpdateAccount,
		handlePatchAccount,
		handleDropToUpdateDate,
		handleDropToUpdateCategory,
	};
}