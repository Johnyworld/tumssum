import React, { useCallback, useState } from 'react';
import { Bank } from 'types';
import BankFormModal from '~/components/organisms/bank/BankFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useToast from '~/hooks/useToast';
import { addBank } from '~/stores/bankSlice';
import api from '~/utils/api';
import { useDispatch, useSelector } from '~/utils/reduxHooks';

export interface BankFormModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankFormModalContainer: React.FC<BankFormModalContainerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const bankGroups = useSelector((state) => state.bank.bankGroups);

  const [isUpdating, setUpdating] = useState(false);

  const handleSubmit = useCallback(
    async ({ title, memo, group }: Bank) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.banks.createBank({ title, memo, group_id: group });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크를 추가했습니다.', 'green');
        dispatch(addBank(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast, isUpdating]
  );

  return (
    <Modal
      isOpen={isOpen}
      children={
        <BankFormModal groupList={bankGroups} isUpdating={isUpdating} onSubmit={handleSubmit} onClose={onClose} />
      }
    />
  );
};

export default BankFormModalContainer;
