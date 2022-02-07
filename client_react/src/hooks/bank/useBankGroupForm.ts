import { useCallback, useState } from 'react';
import { BankGroup } from 'types';
import { addBankGroup, addBanks, removeBankGroup, updateBankGroup } from '~/stores/bankSlice';
import api from '~/utils/api';
import { useDispatch } from '~/utils/reduxHooks';
import useObject from '../useObject';
import useToast from '../useToast';
import useToggle from '../useToggle';

const useBankGroupForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isOpen, onOpen, onClose] = useToggle();

  const editingGroup = useObject<BankGroup>();

  const [isUpdating, setUpdating] = useState(false);

  const handleUpdateBank = useCallback(
    async (group: BankGroup) => {
      const { id: bank_group_id, title } = group;
      const { ok, message, data } = await api.banks.updateBankGroup({ bank_group_id, title });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 수정했습니다.', 'green');
        dispatch(updateBankGroup(data));
        editingGroup.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingGroup, toast]
  );

  const handleCreateBank = useCallback(
    async (group: BankGroup) => {
      const { title } = group;
      const { ok, message, data } = await api.banks.createBankGroup({ title });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 추가했습니다.', 'green');
        dispatch(addBankGroup(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const onSubmit = useCallback(
    async (group: BankGroup) => {
      if (isUpdating) return;
      setUpdating(true);
      if (group.id) handleUpdateBank(group);
      else handleCreateBank(group);
      setUpdating(false);
    },
    [isUpdating, handleCreateBank, handleUpdateBank]
  );

  const onDelete = useCallback(
    async (bank_group_id: number) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.banks.deleteBankGroup({ bank_group_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 삭제했습니다.', 'green');
        dispatch(removeBankGroup(data.id));
        dispatch(addBanks(data.items));
        editingGroup.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingGroup, toast, isUpdating]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    if (editingGroup.data) editingGroup.reset();
  }, [editingGroup, onClose]);

  return {
    selected: editingGroup.data,
    isUpdating,
    isOpenModal: isOpen || !!editingGroup.data,
    onSelect: editingGroup.set,
    onCloseModal,
    onOpenModal: onOpen,
    onDelete,
    onSubmit,
  };
};

export default useBankGroupForm;
