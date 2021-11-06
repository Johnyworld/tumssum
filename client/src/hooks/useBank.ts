import { useCallback, useState } from 'preact/hooks';
import { Bank, BankGroup } from 'types';
import { addBanks, addBank, addBankGroup, removeBank, removeBankGroup, updateBank, updateBankGroup } from '~stores/bankSlice';
import { useDispatch } from '~utils/redux/hooks';
import useConfirm from './useConfirm';
import { GrappingData } from './useDrag';
import useFetch from './useFetch';
import useToast from './useToast';

interface UseBank {
	grapping: GrappingData<Bank> | null;
	onCloseDetail: () => void;
	handleDrop: () => void;
}

export default ({ grapping, onCloseDetail, handleDrop }: UseBank) => {
	
	const dispatch = useDispatch();
	const confirm = useConfirm();
	const toast = useToast();


	const postBankGroup = useFetch<BankGroup>({
		method: 'POST',
		url: '/api/bank-group/',
		onSuccess: data => {
			dispatch(addBankGroup(data));
		}
	})

	const postBank = useFetch<Bank>({
		method: 'POST',
		url: '/api/bank/',
		onSuccess: data => {
			dispatch(addBank(data));
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
			toast('삭제되었습니다.', 'green');
			dispatch(removeBankGroup(data.id));
			dispatch(addBanks(data.items));
			onCloseDetail();
		}
	})

	const deleteBank = useFetch<number>({
		method: 'DELETE',
		url: '/api/bank/',
		onSuccess: data => {
			toast('삭제되었습니다.', 'green');
			dispatch(removeBank(data));
			onCloseDetail();
		}
	})

	const handleAddBankGroup = useCallback(() => {
		if ( postBankGroup.loading ) return;
		postBankGroup.call({
			title: '',
		});
	}, [postBankGroup.loading]);

	const handleAddBank = useCallback(() => {
		if ( postBank.loading ) return;
		postBank.call({
			title: '',
			balance: 0,
		});
	}, [postBank.loading]);

	const handleUpdateBankGroup = useCallback((group: BankGroup) => {
		if ( putBankGroup.loading ) return;
		putBankGroup.call({
			bank_group_id: group.id,
			title: group.title,
		})
	}, [putBankGroup.loading]);

	const handleUpdateBank = useCallback((bank: Bank) => {
		if ( putBank.loading ) return;
		putBank.call({
			bank_id: bank.id,
			group_id: bank.group,
			title: bank.title,
		})
	}, [putBank.loading]);

	const handleDropToUpdateBank = useCallback((groupId: number | null) => () => {
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
	}, [putBank.loading, grapping]);

	const handleRemoveBankGroup = useCallback((id: number) => () => {
		if (deleteBankGroup.loading) return;
		confirm('confirm', '정말 삭제할까요?', () => {
			deleteBankGroup.call({
				bank_group_id: id
			});
		});
	}, [deleteBankGroup.loading]);

	const handleRemoveBank = useCallback((id: number) => () => {
		if (deleteBank.loading) return;
		confirm('confirm', '정말 삭제할까요?', () => {
			deleteBank.call({
				bank_id: id
			});
		});
	}, [deleteBank.loading]);

	
	return {
		handleUpdateBank,
		handleUpdateBankGroup,
		handleDropToUpdateBank,
		handleAddBankGroup,
		handleAddBank,
		handleRemoveBankGroup,
		handleRemoveBank,
	};
}