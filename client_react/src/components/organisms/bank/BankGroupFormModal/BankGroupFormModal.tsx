import React, { useState } from 'react';
import { BankGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentText from '~/components/atoms/ContentText';
import Modal from '../../modals/Modal';

export interface BankGroupFormModalProps {
  isUpdating: boolean;
  onSubmit: (data: BankGroup) => void;
  onClose: () => void;
}

const BankGroupFormModal: React.FC<BankGroupFormModalProps> = ({ isUpdating, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    onSubmit({ title } as BankGroup);
  };

  return (
    <Modal.Container onClose={onClose}>
      <Modal.Content padding>
        <ContentText isTitle value={title} placeholder='뱅크 그룹의 이름을 입력하세요.' onChange={setTitle} />
      </Modal.Content>
      <Modal.Footer flexEnd padding>
        <Button disabled={isUpdating} onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
};

export default BankGroupFormModal;
