import React from 'react';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import BankFormModal from '~/components/organisms/bank/BankFormModal';
import BankGroupFormModal from '~/components/organisms/bank/BankGroupFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useBankForm from '~/hooks/bank/useBankForm';
import useBankGroupForm from '~/hooks/bank/useBankGroupForm';
import useBankTree from '~/hooks/bank/useBankTree';
import { useSelector } from '~/utils/reduxHooks';
import './BankListContainer.scss';

const BankListContainer: React.FC = () => {
  const bankTree = useBankTree();
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
        onClose={bankGroupForm.onCloseModal}
        children={
          <BankGroupFormModal
            isUpdating={bankGroupForm.isUpdating}
            initGroup={bankGroupForm.selected}
            onSubmit={bankGroupForm.onSubmit}
            onDelete={bankGroupForm.onDelete}
          />
        }
      />

      <Modal
        isOpen={bankForm.isOpenModal}
        onClose={bankForm.onCloseModal}
        children={
          <BankFormModal
            groupList={bankGroups}
            isUpdating={bankForm.isUpdating}
            initBank={bankForm.selected}
            onSubmit={bankForm.onSubmit}
            onDelete={bankForm.onDelete}
          />
        }
      />
    </div>
  );
};

export default BankListContainer;
