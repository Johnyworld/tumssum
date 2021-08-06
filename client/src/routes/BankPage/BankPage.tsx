import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import { Bank, BankGroup } from 'types';
import Button from '~components/elements/Button';
import ManagementList from '~components/items/ManagementList';
import Header from '~components/layouts/Header';
import Indicator from '~components/layouts/Indicator';
import Modal from '~components/layouts/Modal';
import BankFormModal from '~components/partials/BankFormModal';
import BankGroupFormModal from '~components/partials/BankGroupFormModal/BankGroupFormModal';
import useBank from '~hooks/useBank';
import useDetails from '~hooks/useDetails';
import useDrag from '~hooks/useDrag';
import { useSelector } from '~utils/redux/hooks';


const getBankAligned = (banks: Bank[]) => {
	const results: {[x:string]: Bank[]} = {}
	for ( const item of banks ) {
		const key = item.group || 'EMPTY';
		if (!results[key]) results[key] = [];
		results[key].push(item);
	}
	return results;
}


export const combineBanksWithGroups = (banks: Bank[], bankGroups: BankGroup[]) => {
	const aligned = getBankAligned(banks);
	const groups: BankGroup[] = bankGroups.map(group => {
		return {
			...group,
			items: aligned[group.id] || [],
		}
	});
	return [...groups, { items: aligned.EMPTY || [] } as BankGroup]
}


const BankPage: FunctionalComponent = ({  }) => {

	const { banks, bankGroups } = useSelector(state=> state.bank);
	const { detailView, handleCloseDetail, handleViewDetail } = useDetails<Bank>();
	const { detailView: detailViewGroup, handleCloseDetail: handleCloseDetailGroup, handleViewDetail: handleViewDetailGroup } = useDetails<BankGroup>();

	const closeDetails = useCallback(() => {
		handleCloseDetail();
		handleCloseDetailGroup();
	}, []);

	const combined = combineBanksWithGroups(banks, bankGroups);

	const { grapping, grappingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(banks);

	const {
		focusGroup,
		focusItem,
		handleUpdateBankGroup,
		handleUpdateBank,
		handleDropToUpdateBank,
		handleAddBankGroup,
		handleAddBank,
		handleRemoveBankGroup,
		handleRemoveBank
	} = useBank({ grapping, onCloseDetail: closeDetails, handleDrop });

	return (
		<div class='bank-page wrap'>

			<Header>
				<h1 class='header-title'>뱅크 관리</h1>
			</Header>

			<Indicator flexEnd>
				<Button size='small' onClick={handleAddBankGroup} color='gray' children='+ 그룹 추가' />
				<Button size='small' onClick={handleAddBank} children='+ 뱅크 추가' />
			</Indicator>

			<ManagementList
				data={combined}
				grapping={grapping}
				grappingPos={grappingPos}
				focusGroup={focusGroup}
				focusItem={focusItem}
				isDragging={isDragging}
				onGrap={handleGrap}
				onDropToUpdate={handleDropToUpdateBank}
				onDrop={handleDrop}
				onDragging={handleDragging}
				onUpdate={handleUpdateBank}
				onClick={handleViewDetail}
				onClickGroup={handleViewDetailGroup}
			/>

			<Modal isOpen={!!detailView} onClose={handleCloseDetail}>
				{ detailView &&
					<BankFormModal
						bank={detailView}
						groupList={bankGroups}
						onConfirm={handleUpdateBank}
						onDelete={handleRemoveBank}
					/>
				}
			</Modal>

			<Modal isOpen={!!detailViewGroup} onClose={handleCloseDetailGroup}>
				{ detailViewGroup &&
					<BankGroupFormModal
						group={detailViewGroup}
						onConfirm={handleUpdateBankGroup}
						onDelete={handleRemoveBankGroup}
					/>
				}
			</Modal>

		</div>
	)
}

export default BankPage;
