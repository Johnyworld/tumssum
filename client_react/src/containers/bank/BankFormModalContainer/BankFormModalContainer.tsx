import React, { useCallback, useState } from 'react';
import { Bank } from 'types';
import BankFormModal from '~/components/organisms/bank/BankFormModal';
import useToast from '~/hooks/useToast';
import { addBank, updateBank } from '~/stores/bankSlice';
import api from '~/utils/api';
import { useDispatch, useSelector } from '~/utils/reduxHooks';

export interface BankFormModalContainerProps {
  initBank?: Bank | null;
  onClose: () => void;
}

const BankFormModalContainer: React.FC<BankFormModalContainerProps> = ({ initBank, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const bankGroups = useSelector(state => state.bank.bankGroups);

  const [isUpdating, setUpdating] = useState(false);

  const callUpdateBank = useCallback(
    async (bank: Bank) => {
      const { id: bank_id, title, memo, group: group_id } = bank;
      const { ok, message, data } = await api.banks.updateBank({ bank_id, title, memo, group_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크를 수정했습니다.', 'green');
        dispatch(updateBank(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const callCreateBank = useCallback(
    async (bank: Bank) => {
      const { title, memo, group: group_id } = bank;
      const { ok, message, data } = await api.banks.createBank({ title, memo, group_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크를 추가했습니다.', 'green');
        dispatch(addBank(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const handleSubmit = useCallback(
    async (bank: Bank) => {
      if (isUpdating) return;
      setUpdating(true);
      if (bank.id) callUpdateBank(bank);
      else callCreateBank(bank);
      setUpdating(false);
    },
    [callCreateBank, callUpdateBank, isUpdating]
  );

  return (
    <BankFormModal
      groupList={bankGroups}
      isUpdating={isUpdating}
      initBank={initBank}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default BankFormModalContainer;
