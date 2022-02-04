import React, { useCallback, useState } from 'react';
import { Bank, BankGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentDropdown from '~/components/atoms/ContentDropdown';
import ContentText from '~/components/atoms/ContentText';
import ContentTextarea from '~/components/atoms/ContentTextarea';
import Modal from '../../modals/Modal';

export interface BankFormModalProps {
  groupList: BankGroup[];
  isUpdating: boolean;
  onSubmit: (data: Bank) => void;
  onClose: () => void;
}

const BankFormModal: React.FC<BankFormModalProps> = ({ groupList, isUpdating, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit({ title, memo, group: +group } as Bank);
  }, [title, memo, group, onSubmit]);

  return (
    <Modal.Container onClose={onClose}>
      <Modal.Content padding>
        <ContentText
          isTitle
          value={title}
          placeholder='뱅크 이름을 입력하세요.'
          onChange={setTitle}
          style={{ marginBottom: '2rem' }}
        />
        <ContentDropdown
          label='그룹'
          list={[...groupList, { id: 0, title: '그룹 미지정' }].map((group) => ({ id: group.id, text: group.title }))}
          selected={group}
          placeholder='뱅크 그룹을 선택하세요.'
          onSelect={setGroup}
        />
        <ContentTextarea label='메모' value={title} placeholder='메모를 입력하세요.' onChange={setMemo} />
      </Modal.Content>
      <Modal.Footer flexEnd padding>
        <Button disabled={isUpdating} onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
};

export default BankFormModal;