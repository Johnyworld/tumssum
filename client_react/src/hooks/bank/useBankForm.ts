import { useCallback, useState } from 'react';
import { useDispatch } from '~/utils/reduxHooks';
import useToast from '../useToast';
import { Bank } from 'types';
import api from '~/utils/api';
import useToggle from '../useToggle';
import { addBank, removeBank, updateBank } from '~/stores/bankSlice';
import useObject from '../useObject';

const useBankForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isOpen, onOpen, onClose] = useToggle();

  const editingBank = useObject<Bank>();

  const [isUpdating, setUpdating] = useState(false);

  const handleUpdateBank = useCallback(
    async (bank: Bank) => {
      const { id: bank_id, title, memo, group: group_id } = bank;
      const { ok, message, data } = await api.banks.updateBank({ bank_id, title, memo, group_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크를 수정했습니다.', 'green');
        dispatch(updateBank(data));
        editingBank.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingBank, toast]
  );

  const handleCreateBank = useCallback(
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

  const onSubmit = useCallback(
    async (bank: Bank) => {
      if (isUpdating) return;
      setUpdating(true);
      if (bank.id) handleUpdateBank(bank);
      else handleCreateBank(bank);
      setUpdating(false);
    },
    [handleCreateBank, handleUpdateBank, isUpdating]
  );

  const onDelete = useCallback(
    async (bank_id: number) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.banks.deleteBank({ bank_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크를 삭제했습니다.', 'green');
        dispatch(removeBank(data));
        editingBank.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingBank, toast, isUpdating]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    if (editingBank.data) editingBank.reset();
  }, [editingBank, onClose]);

  return {
    selected: editingBank.data,
    isUpdating,
    isOpenModal: isOpen || !!editingBank.data,
    onSelect: editingBank.set,
    onCloseModal,
    onOpenModal: onOpen,
    onDelete,
    onSubmit,
  };
};

export default useBankForm;
