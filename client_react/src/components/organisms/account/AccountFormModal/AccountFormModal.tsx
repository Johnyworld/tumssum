import React, { useCallback, useState } from 'react';
import { Account, BankTree, CategoryTree } from 'types';
import Button from '~/components/atoms/Button';
import ContentDate from '~/components/atoms/ContentDate';
import ContentDropdown from '~/components/atoms/ContentDropdown';
import ContentNumber from '~/components/atoms/ContentNumber';
import ContentText from '~/components/atoms/ContentText';
import ContentTextarea from '~/components/atoms/ContentTextarea';
import ContentTime from '~/components/atoms/ContentTime';
import useDatetimeInput from '~/hooks/useDatetimeInput';
import Modal from '../../modals/Modal';

export interface AccountFormModalProps {
  bankTree: BankTree;
  categoryTree: CategoryTree;
  isUpdating: boolean;
  initAccount?: Account | null;
  onSubmit: (data: Account) => void;
  onDelete: (id: number) => void;
}

const AccountFormModal: React.FC<AccountFormModalProps> = ({
  bankTree,
  categoryTree,
  isUpdating,
  initAccount,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(initAccount?.title || '');
  const [account, setAccount] = useState<string>(
    initAccount?.account === undefined ? '' : String(initAccount.account) || '0'
  );
  const [category, setCategory] = useState(String(initAccount?.category || ''));
  const [bank, setBank] = useState(String(initAccount?.bank || ''));
  const { customDate, handleChangeDate, handleChangeTime } = useDatetimeInput(initAccount?.datetime);
  const [memo, setMemo] = useState(initAccount?.memo || '');

  const handleSubmit = useCallback(() => {
    onSubmit({
      id: initAccount?.id || undefined,
      title,
      account: +account,
      datetime: customDate.getLocalYYYYMMDDHHmmss(),
      memo,
      category: +category || null,
      bank: +bank || null,
    } as Account);
  }, [onSubmit, initAccount?.id, title, account, customDate, memo, category, bank]);

  const handleDelete = useCallback(() => {
    if (initAccount && initAccount.id) onDelete(initAccount.id);
  }, [initAccount, onDelete]);

  return (
    <Modal.Container>
      <Modal.Content padding>
        <ContentText
          isTitle
          value={title}
          placeholder='?????? ????????? ???????????????.'
          onChange={setTitle}
          style={{ marginBottom: '2rem' }}
        />
        <ContentNumber label='??????' value={account} onChange={setAccount} placeholder='????????????' />
        <ContentDropdown
          label='????????????'
          list={[
            { id: '', text: '?????????' },
            ...categoryTree.map(group => ({
              id: group.id,
              text: group.title || '?????? ??????',
              children: group.items?.map(category => ({ id: category.id, text: category.title || '?????? ??????' })),
            })),
          ]}
          selected={category}
          onSelect={setCategory}
        />
        <ContentDropdown
          label='??????'
          list={[
            { id: '', text: '?????????' },
            ...bankTree.map(group => ({
              id: group.id,
              text: group.title || '?????? ??????',
              children: group.items?.map(bank => ({ id: bank.id, text: bank.title || '?????? ??????' })),
            })),
          ]}
          selected={bank}
          onSelect={setBank}
        />
        <ContentDate label='??????' placeholder='????????????' value={customDate.getLocalYYYYMMDD()} onChange={handleChangeDate} />
        <ContentTime label='??????' placeholder='????????????' value={customDate.getLocalHHmm()} onChange={handleChangeTime} />
        <ContentTextarea label='??????' value={memo} placeholder='????????? ???????????????.' onChange={setMemo} />
      </Modal.Content>
      <Modal.Footer padding flex>
        <Button disabled={isUpdating} onClick={handleSubmit}>
          ??????
        </Button>
        {initAccount && (
          <p className='c-red f-bold pointer' onClick={handleDelete}>
            ??????
          </p>
        )}
      </Modal.Footer>
    </Modal.Container>
  );
};

export default AccountFormModal;
