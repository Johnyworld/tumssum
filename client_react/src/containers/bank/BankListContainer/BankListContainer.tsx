import React, { useCallback } from 'react';
import { Bank, BankGroup, BankTree } from 'types';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import Modal from '~/components/organisms/modals/Modal';
import useObject from '~/hooks/useObject';
import useToggle from '~/hooks/useToggle';
import BankFormModalContainer from '../BankFormModalContainer';
import BankGroupFormModalContainer from '../BankGroupFormModalContainer';
import './BankListContainer.scss';

export interface BankListContainerProps {
  bankTree: BankTree;
}

const BankListContainer: React.FC<BankListContainerProps> = ({ bankTree }) => {
  const [isOpenCreateGroup, onOpenCreateGroup, onCloseCreateGroup] = useToggle();
  const [isOpenCreateBank, onOpenCreateBank, onCloseCreateBank] = useToggle();

  const editingGroup = useObject<BankGroup>();
  const editingBank = useObject<Bank>();

  const handleCloseBankGroupFormModal = useCallback(() => {
    onCloseCreateGroup();
    if (editingGroup.data) editingGroup.reset();
  }, [editingGroup, onCloseCreateGroup]);

  const handleCloseBankFormModal = useCallback(() => {
    onCloseCreateBank();
    if (editingBank.data) editingBank.reset();
  }, [editingBank, onCloseCreateBank]);

  return (
    <div className='bank-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' onClick={onOpenCreateGroup} children='그룹 추가하기' />
        <Button size='small' onClick={onOpenCreateBank} children='뱅크 추가하기' />
      </div>

      <BankList bankTree={bankTree} onClick={editingBank.set} />

      <Modal
        isOpen={isOpenCreateGroup}
        children={<BankGroupFormModalContainer onClose={handleCloseBankGroupFormModal} />}
      />

      <Modal
        isOpen={isOpenCreateBank || !!editingBank.data}
        children={<BankFormModalContainer initBank={editingBank.data} onClose={handleCloseBankFormModal} />}
      />
    </div>
  );
};

export default BankListContainer;
