import React, { useState } from 'react';
import { BankGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentText from '~/components/atoms/ContentText';
import Modal from '../../modals/Modal';

export interface BankGroupFormModalProps {
  onSubmit: (data: BankGroup) => void;
}

const BankGroupFormModal: React.FC<BankGroupFormModalProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    onSubmit({ title } as BankGroup);
  };

  return (
    <Modal.Container>
      <Modal.Content padding>
        <ContentText isTitle value={title} placeholder='뱅크 그룹의 이름을 입력하세요.' onChange={setTitle} />
      </Modal.Content>
      <Modal.Footer flexEnd padding>
        <Button onClick={handleSubmit}>확인</Button>
      </Modal.Footer>
    </Modal.Container>
  );
};

export default BankGroupFormModal;
