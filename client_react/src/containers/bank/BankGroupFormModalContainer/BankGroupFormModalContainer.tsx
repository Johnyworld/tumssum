import React, { useCallback, useState } from 'react';
import { BankGroup } from 'types';
import BankGroupFormModal from '~/components/organisms/bank/BankGroupFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useToast from '~/hooks/useToast';
import { addBankGroup } from '~/stores/bankSlice';
import api from '~/utils/api';
import { useDispatch } from '~/utils/reduxHooks';

export interface BankGroupFormModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankGroupFormModalContainer: React.FC<BankGroupFormModalContainerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [isUpdating, setUpdating] = useState(false);

  const handleSubmit = useCallback(
    async ({ title }: BankGroup) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.banks.createBankGroup({ title });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 추가했습니다.', 'green');
        dispatch(addBankGroup(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast, isUpdating]
  );

  return (
    <Modal
      isOpen={isOpen}
      children={<BankGroupFormModal onSubmit={handleSubmit} isUpdating={isUpdating} onClose={onClose} />}
    />
  );
};

export default BankGroupFormModalContainer;
