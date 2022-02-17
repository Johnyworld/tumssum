import React, { useCallback, useState } from 'react';
import { CategoryGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentText from '~/components/atoms/ContentText';
import Modal from '../../modals/Modal';

export interface CategoryGroupFormModalProps {
  isUpdating: boolean;
  initGroup?: CategoryGroup | null;
  onSubmit: (data: CategoryGroup) => void;
  onDelete: (id: number) => void;
}

const CategoryGroupFormModal: React.FC<CategoryGroupFormModalProps> = ({
  isUpdating,
  initGroup,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(initGroup?.title || '');

  const handleSubmit = useCallback(() => {
    onSubmit({ id: initGroup?.id || undefined, title } as CategoryGroup);
  }, [title, initGroup, onSubmit]);

  const handleDelete = useCallback(() => {
    if (initGroup && initGroup.id) onDelete(initGroup.id);
  }, [initGroup, onDelete]);

  return (
    <Modal.Container>
      <Modal.Content padding>
        <ContentText isTitle value={title} placeholder='카테고리 그룹 이름을 입력하세요.' onChange={setTitle} />
      </Modal.Content>
      <Modal.Footer flex padding>
        <Button disabled={isUpdating} onClick={handleSubmit}>
          저장
        </Button>
        {initGroup && (
          <p className='c-red f-bold pointer' onClick={handleDelete}>
            삭제
          </p>
        )}
      </Modal.Footer>
    </Modal.Container>
  );
};

export default CategoryGroupFormModal;
