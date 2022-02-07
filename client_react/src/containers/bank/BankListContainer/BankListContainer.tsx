import React, { useCallback } from 'react';
import { BankGroup, BankTree } from 'types';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import BankFormModal from '~/components/organisms/bank/BankFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useBankForm from '~/hooks/bank/useBankForm';
import useObject from '~/hooks/useObject';
import useToggle from '~/hooks/useToggle';
import { useSelector } from '~/utils/reduxHooks';
import BankGroupFormModalContainer from '../BankGroupFormModalContainer';
import './BankListContainer.scss';

export interface BankListContainerProps {
  bankTree: BankTree;
}

const BankListContainer: React.FC<BankListContainerProps> = ({ bankTree }) => {
  const bankGroups = useSelector(state => state.bank.bankGroups);
  const [isOpenCreateGroup, onOpenCreateGroup, onCloseCreateGroup] = useToggle();

  const editingGroup = useObject<BankGroup>();

  const handleCloseBankGroupFormModal = useCallback(() => {
    onCloseCreateGroup();
    if (editingGroup.data) editingGroup.reset();
  }, [editingGroup, onCloseCreateGroup]);

  const bankForm = useBankForm();

  return (
    <div className='bank-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' onClick={onOpenCreateGroup} children='그룹 추가하기' />
        <Button size='small' onClick={bankForm.onOpenModal} children='뱅크 추가하기' />
      </div>

      <BankList bankTree={bankTree} onClick={bankForm.onSelect} />

      <Modal
        isOpen={isOpenCreateGroup}
        children={<BankGroupFormModalContainer onClose={handleCloseBankGroupFormModal} />}
      />

      <Modal
        isOpen={bankForm.isOpenModal}
        children={
          <BankFormModal
            groupList={bankGroups}
            isUpdating={bankForm.isUpdating}
            initBank={bankForm.selected}
            onSubmit={bankForm.onSubmit}
            onClose={bankForm.onCloseModal}
          />
        }
      />
    </div>
  );
};

export default BankListContainer;
