import { useCallback, useState } from 'react';
import { Account } from 'types';
import { useDispatch } from '~/utils/reduxHooks';
import { addAccount, removeAccount } from '~/stores/accountSlice';
import useObject from '../useObject';
import useToast from '../useToast';
import useToggle from '../useToggle';
import api from '~/utils/api';

const useAccountForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isOpen, onOpen, onClose] = useToggle();

  const editingAccount = useObject<Account>();

  const [isUpdating, setUpdating] = useState(false);

  const onCloseModal = useCallback(() => {
    onClose();
    if (editingAccount.data) editingAccount.reset();
  }, [editingAccount, onClose]);

  const handleCreateAccount = useCallback(
    async (accountData: Account) => {
      const { ok, message, data } = await api.accounts.createAccount(accountData);
      if (!ok) toast(message, 'red');
      else {
        toast('가계부를 추가했습니다.', 'green');
        dispatch(addAccount(data.account));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const onSubmit = useCallback(
    async (account: Account) => {
      if (isUpdating) return;
      setUpdating(true);
      await handleCreateAccount(account);
      // if (account.id) await handleUpdateBank(account);
      // else await handleCreateAccount(account);
      setUpdating(false);
    },
    [handleCreateAccount, isUpdating]
  );

  const onDelete = useCallback(
    async (id: number) => {
      const { ok, message, data } = await api.accounts.deleteAccount({ id });
      if (!ok) toast(message, 'red');
      else {
        toast('가계부를 삭제했습니다.', 'green');
        dispatch(removeAccount(data.account));
        onCloseModal();
      }
      setUpdating(false);
    },
    [dispatch, onCloseModal, toast]
  );

  return {
    selected: editingAccount.data,
    isUpdating,
    isOpenModal: isOpen || !!editingAccount.data,
    onSelect: editingAccount.set,
    onCloseModal,
    onOpenModal: onOpen,
    onDelete,
    onSubmit,
  };
};

export default useAccountForm;
