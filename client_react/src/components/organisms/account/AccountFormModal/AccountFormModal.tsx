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
  const { datetime, yyyymmdd, time, setDate, setTime } = useDatetimeInput(initAccount?.datetime);
  const [memo, setMemo] = useState(initAccount?.memo || '');

  const handleSubmit = useCallback(() => {
    onSubmit({
      id: initAccount?.id || undefined,
      title,
      account: +account,
      datetime,
      memo,
      category: +category || null,
      bank: +bank || null,
    } as Account);
  }, [initAccount, title, account, datetime, memo, category, bank, onSubmit]);

  const handleDelete = useCallback(() => {
    if (initAccount && initAccount.id) onDelete(initAccount.id);
  }, [initAccount, onDelete]);

  return (
    <Modal.Container>
      <Modal.Content padding>
        <ContentText
          isTitle
          value={title}
          placeholder='뱅크 이름을 입력하세요.'
          onChange={setTitle}
          style={{ marginBottom: '2rem' }}
        />
        <ContentNumber label='금액' value={account} onChange={setAccount} placeholder='비어있음' />
        <ContentDropdown
          label='카테고리'
          list={[
            { id: '', text: '미분류' },
            ...categoryTree.map(group => ({
              id: group.id,
              text: group.title || '이름 없음',
              children: group.items?.map(category => ({ id: category.id, text: category.title || '이름 없음' })),
            })),
          ]}
          selected={category}
          onSelect={setCategory}
        />
        <ContentDropdown
          label='뱅크'
          list={[
            { id: '', text: '미분류' },
            ...bankTree.map(group => ({
              id: group.id,
              text: group.title || '이름 없음',
              children: group.items?.map(bank => ({ id: bank.id, text: bank.title || '이름 없음' })),
            })),
          ]}
          selected={bank}
          onSelect={setBank}
        />
        <ContentDate label='날짜' placeholder='비어있음' value={yyyymmdd} onChange={setDate} />
        <ContentTime label='시간' placeholder='비어있음' time={time} onChange={setTime} />
        <ContentTextarea label='메모' value={memo} placeholder='메모를 입력하세요.' onChange={setMemo} />
      </Modal.Content>
      <Modal.Footer padding flex>
        <Button disabled={isUpdating} onClick={handleSubmit}>
          저장
        </Button>
        {initAccount && (
          <p className='c-red f-bold pointer' onClick={handleDelete}>
            삭제
          </p>
        )}
      </Modal.Footer>
    </Modal.Container>
  );
};

export default AccountFormModal;
