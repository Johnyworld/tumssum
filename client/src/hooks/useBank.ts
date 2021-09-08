import { useState } from 'preact/hooks';
import { Bank, BankGroup } from 'types';
import { addBanks, addBank, addBankGroup, removeBank, removeBankGroup, updateBank, updateBankGroup } from '~stores/bankSlice';
import { useDispatch } from '~utils/redux/hooks';
import { GrappingData } from './useDrag';
import useFetch from './useFetch';

interface UseBank {
	grapping: GrappingData<Bank> | null;
	onCloseDetail: () => void;
	handleDrop: () => void;
}

export default ({ grapping, onCloseDetail, handleDrop }: UseBank) => {
	
	const dispatch = useDispatch();
	const [ focusItem, setFocusItem ] = useState<number | null>(null);
	const [ focusGroup, setFocusGroup ] = useState<number | null>(null);


	const postBankGroup = useFetch<BankGroup>({
		method: 'POST',
		url: '/api/bank-group/',
		onSuccess: data => {
			dispatch(addBankGroup(data));
			setFocusGroup(data.id);
			setTimeout(() => setFocusGroup(null))
		}
	})

	const postBank = useFetch<Bank>({
		method: 'POST',
		url: '/api/bank/',
		onSuccess: data => {
			dispatch(addBank(data));
			setFocusItem(data.id);
			setTimeout(() => setFocusItem(null))
		}
	})

	const putBankGroup = useFetch<BankGroup>({
		method: 'PUT',
		url: '/api/bank-group/',
		onSuccess: data => {
			dispatch(updateBankGroup(data));
			onCloseDetail();
		}
	});

	const putBank = useFetch<Bank>({
		method: 'PUT',
		url: '/api/bank/',
		onSuccess: data => {
			dispatch(updateBank(data));
			onCloseDetail();
		}
	});

	const deleteBankGroup = useFetch<{ id: number, items: Bank[] }>({
		method: 'DELETE',
		url: '/api/bank-group/',
		onSuccess: data => {
			dispatch(removeBankGroup(data.id));
			dispatch(addBanks(data.items));
			onCloseDetail();
		}
	})

	const deleteBank = useFetch<number>({
		method: 'DELETE',
		url: '/api/bank/',
		onSuccess: data => {
			dispatch(removeBank(data));
			onCloseDetail();
		}
	})

	const handleAddBankGroup = () => {
		if ( postBankGroup.loading ) return;
		postBankGroup.call({
			title: '',
		});
	}

	const handleAddBank = () => {
		if ( postBank.loading ) return;
		postBank.call({
			title: '',
			balance: 0,
		});
	}

	const handleUpdateBankGroup = (group: BankGroup) => {
		if ( putBankGroup.loading ) return;
		putBankGroup.call({
			bank_group_id: group.id,
			title: group.title,
		})
	}

	const handleUpdateBank = (bank: Bank) => {
		if ( putBank.loading ) return;
		putBank.call({
			bank_id: bank.id,
			group_id: bank.group,
			title: bank.title,
		})
	}

	const handleDropToUpdateBank = (groupId: number | null) => () => {
		if (putBank.loading || !grapping ) return;
		if (groupId === grapping.data.group) {
			handleDrop();
			return;
		}
		putBank.call({
			bank_id: grapping.data.id,
			group_id: groupId || null
		})
		dispatch(updateBank({ id: grapping.data.id, group: groupId } as Bank));
		handleDrop();
	}

	const handleRemoveBankGroup = (id: number) => () => {
		if (deleteBankGroup.loading) return;
		deleteBankGroup.call({
			bank_group_id: id
		});
	}

	const handleRemoveBank = (id: number) => () => {
		if (deleteBank.loading) return;
		deleteBank.call({
			bank_id: id
		});
	}

	
	return {
		focusItem,
		focusGroup,
		handleUpdateBank,
		handleUpdateBankGroup,
		handleDropToUpdateBank,
		handleAddBankGroup,
		handleAddBank,
		handleRemoveBankGroup,
		handleRemoveBank,
	};
}