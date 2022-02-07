import React, { useCallback, useState } from 'react';
import { BankGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentText from '~/components/atoms/ContentText';
import Modal from '../../modals/Modal';

export interface BankGroupFormModalProps {
  isUpdating: boolean;
  initGroup?: BankGroup | null;
  onSubmit: (data: BankGroup) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const BankGroupFormModal: React.FC<BankGroupFormModalProps> = ({
  isUpdating,
  initGroup,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState(initGroup?.title || '');

  const handleSubmit = useCallback(() => {
    onSubmit({ id: initGroup?.id || undefined, title } as BankGroup);
  }, [title, initGroup, onSubmit]);

  const handleDelete = useCallback(() => {
    if (initGroup && initGroup.id) onDelete(initGroup.id);
  }, [initGroup, onDelete]);

  return (
    <Modal.Container onClose={onClose}>
      <Modal.Content padding>
        <ContentText isTitle value={title} placeholder='뱅크 그룹의 이름을 입력하세요.' onChange={setTitle} />
      </Modal.Content>
      <Modal.Footer flex padding>
        {initGroup && (
          <p className='c-red f-bold pointer' onClick={handleDelete}>
            삭제
          </p>
        )}
        <Button disabled={isUpdating} onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
};

export default BankGroupFormModal;
