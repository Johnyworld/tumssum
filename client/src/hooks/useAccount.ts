import { useState } from "preact/hooks";
import { Account } from "types";
import { addAccount, removeAccount, updateAccount } from '~features/account/accountSlice';
import { getLocalString, getLocalStringFromISOString } from '~utils/calendar';
import { useDispatch } from '~utils/redux/hooks';
import useDetails from "./useDetails";
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

	const { detailView, handleCloseDetail, handleViewDetail } = useDetails<Account>();
	
	const createNewAccount = useFetch<Account>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			dispatch(addAccount(data));
			toggleCreateModal.handleOff();
		}
	});

	const fetchUpdateAccount = useFetch<Account>({
		method: 'PUT',
		url: '/api/account/',
		onSuccess: data => {
			data.datetime = getLocalStringFromISOString(data.datetime);
			dispatch(updateAccount({ id: data.id, data }));
			toggleCreateModal.handleOff();
			handleCloseDetail();
		}
	});

	const deleteAccount = useFetch<number>({
		method: 'DELETE',
		url: '/api/account/',
		onSuccess: data => {
			dispatch(removeAccount(data));
			handleCloseDetail();
		}
	});

	const handleCloseCreateModal = () => {
		setInitialValuesForCreate(null);
		toggleCreateModal.handleOff();
	}

	const handleOpenCreateModalWithDate = (date: string) => () => {
		setInitialValuesForCreate({ datetime: date } as Account);
		toggleCreateModal.handleOn();
	}

	const handleOpenCreateModalWithCategory = (categoryId: number) => () => {
		setInitialValuesForCreate({ category: categoryId } as Account);
		toggleCreateModal.handleOn();
	}

	const handleCreateAccount = (accountData: Account) => {
		if (createNewAccount.loading) return;
		const { id, title, account, datetime, category, bank, memo } = accountData;
		createNewAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
			memo,
		})
	}

	const handleDeleteAccount = (id: number) => () => {
		if (deleteAccount.loading) return;
		deleteAccount.call({
			account_id: id,
		})
	}

	const handleUpdateAccount = (accountData: Account) => {
		if (fetchUpdateAccount.loading) return;
		const { id, title, account, datetime, category, bank, memo } = accountData;
		if (!id) return;
		fetchUpdateAccount.call({
			account_id: id,
			title,
			account,
			datetime,
			category_id: category,
			bank_id: bank,
			memo,
		})
	}

	const updateAndDrop = (data: Account) => {
		if (!grapping) return;
		dispatch(updateAccount({ id: grapping.data.id, data }));
		handleDrop();
	}

	const handleDropToUpdateDate = (date: string) => () => {
		if (fetchUpdateAccount.loading || !grapping ) return;
		const datetime = date + 'T' + grapping!.data.datetime.split('T')[1]
		if (date === grapping.data.datetime.substr(0, 10)) {
			handleDrop();
			return;
		}
		const localtime = getLocalString(new Date(grapping.data.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAndDrop({ datetime } as Account);
		fetchUpdateAccount.call({
			account_id: grapping.data.id,
			datetime: isoString,
		});
	}

	const handleDropToUpdateCategory = (categoryId: number | null, categoryTitle: string) => () => {
		if (fetchUpdateAccount.loading || !grapping ) return;
		if (categoryId === grapping.data.category) {
			handleDrop();
			return;
		}
		updateAndDrop({ category: categoryId, category_title: categoryTitle } as Account);
		fetchUpdateAccount.call({
			account_id: grapping.data.id,
			category_id: categoryId,
		});
	}

	return {
		initialValuesForCreate,

		detailView,
		handleViewDetail,
		handleCloseDetail,

		isOpenCreateModal: toggleCreateModal.checked,
		handleOpenCreateModal: toggleCreateModal.handleOn,
		handleOpenCreateModalWithDate,
		handleOpenCreateModalWithCategory,
		handleCloseCreateModal,

		handleCreateAccount,
		handleDeleteAccount,
		handleUpdateAccount,
		handleDropToUpdateDate,
		handleDropToUpdateCategory,
	};
}