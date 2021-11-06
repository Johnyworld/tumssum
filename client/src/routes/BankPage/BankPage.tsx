import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import { Bank, BankGroup } from 'types';
import Button from '~components/atoms/Button';
import ManagementList from '~components/molecules/ManagementList';
import Header from '~components/layouts/Header';
import Indicator from '~components/layouts/Indicator';
import Modal from '~components/layouts/Modal';
import BankFormModal from '~components/organisms/BankFormModal';
import BankGroupFormModal from '~components/organisms/BankGroupFormModal/BankGroupFormModal';
import useBank from '~hooks/useBank';
import useDetails from '~hooks/useSelectItem';
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
	const { selectedItem, handleClearSelectedItem, handleSelectItem } = useDetails<Bank>();
	const { selectedItem: selectedGroupItem, handleClearSelectedItem: handleClearSelectedGroupItem, handleSelectItem: handleSelectedGroupItem } = useDetails<BankGroup>();

	const closeDetails = useCallback(() => {
		handleClearSelectedItem();
		handleClearSelectedGroupItem();
	}, []);

	const combined = combineBanksWithGroups(banks, bankGroups);

	const { grabbing, grabbingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(banks);

	const {
		handleUpdateBankGroup,
		handleUpdateBank,
		handleDropToUpdateBank,
		handleAddBankGroup,
		handleAddBank,
		handleRemoveBankGroup,
		handleRemoveBank
	} = useBank({ grabbing, onCloseDetail: closeDetails, handleDrop });

	return (
		<main class='bank-page main wrap'>

			<Header>
				<h1 class='header-title'>뱅크 관리</h1>
			</Header>

			<Indicator flexEnd>
				<Button size='small' onClick={handleAddBankGroup} color='gray' children='+ 그룹 추가' />
				<Button size='small' onClick={handleAddBank} children='+ 뱅크 추가' />
			</Indicator>

			<ManagementList
				data={combined}
				grabbing={grabbing}
				grabbingPos={grabbingPos}
				onGrap={handleGrap}
				onDropToUpdate={handleDropToUpdateBank}
				onDrop={handleDrop}
				onDragging={handleDragging}
				onClick={handleSelectItem}
				onClickGroup={handleSelectedGroupItem}
			/>

			<Modal isOpen={!!selectedItem} onClose={handleClearSelectedItem}>
				{ selectedItem &&
					<BankFormModal
						bank={selectedItem}
						groupList={bankGroups}
						onConfirm={handleUpdateBank}
						onDelete={handleRemoveBank}
					/>
				}
			</Modal>

			<Modal isOpen={!!selectedGroupItem} onClose={handleClearSelectedGroupItem}>
				{ selectedGroupItem &&
					<BankGroupFormModal
						group={selectedGroupItem}
						onConfirm={handleUpdateBankGroup}
						onDelete={handleRemoveBankGroup}
					/>
				}
			</Modal>

		</main>
	)
}

export default BankPage;
