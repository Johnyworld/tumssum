import React from 'react';
import { BankTree } from 'types';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import BankFormModal from '~/components/organisms/bank/BankFormModal';
import BankGroupFormModal from '~/components/organisms/bank/BankGroupFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useBankForm from '~/hooks/bank/useBankForm';
import useBankGroupForm from '~/hooks/bank/useBankGroupForm';
import { useSelector } from '~/utils/reduxHooks';
import './BankListContainer.scss';

export interface BankListContainerProps {
  bankTree: BankTree;
}

const BankListContainer: React.FC<BankListContainerProps> = ({ bankTree }) => {
  const bankGroups = useSelector(state => state.bank.bankGroups);

  const bankForm = useBankForm();
  const bankGroupForm = useBankGroupForm();

  return (
    <div className='bank-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' onClick={bankGroupForm.onOpenModal} children='그룹 추가하기' />
        <Button size='small' onClick={bankForm.onOpenModal} children='뱅크 추가하기' />
      </div>

      <BankList bankTree={bankTree} onClickBank={bankForm.onSelect} onClickGroup={bankGroupForm.onSelect} />

      <Modal
        isOpen={bankGroupForm.isOpenModal}
        children={
          <BankGroupFormModal
            isUpdating={bankGroupForm.isUpdating}
            initGroup={bankGroupForm.selected}
            onSubmit={bankGroupForm.onSubmit}
            onClose={bankGroupForm.onCloseModal}
          />
        }
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
