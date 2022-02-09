import React, { useCallback, useState } from 'react';
import { Category, CategoryGroup } from 'types';
import Button from '~/components/atoms/Button';
import ContentDropdown from '~/components/atoms/ContentDropdown';
import ContentNumber from '~/components/atoms/ContentNumber';
import ContentText from '~/components/atoms/ContentText';
import ContentTextarea from '~/components/atoms/ContentTextarea';
import Modal from '../../modals/Modal';

export interface CategoryFormModalProps {
  groupList: CategoryGroup[];
  isUpdating: boolean;
  initCategory?: Category | null;
  onSubmit: (data: Category) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  groupList,
  isUpdating,
  initCategory,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState(initCategory?.title || '');
  const [group, setGroup] = useState(initCategory?.group ? String(initCategory.group) : '');
  const [budget, setBudget] = useState(initCategory?.budget ? initCategory.budget : '');
  const [memo, setMemo] = useState(initCategory?.memo || '');

  const handleSubmit = useCallback(() => {
    onSubmit({ id: initCategory?.id || undefined, title, budget, memo, group: +group } as Category);
  }, [initCategory, title, budget, memo, group, onSubmit]);

  const handleDelete = useCallback(() => {
    if (initCategory && initCategory.id) onDelete(initCategory.id);
  }, [initCategory, onDelete]);

  return (
    <Modal.Container onClose={onClose}>
      <Modal.Content padding>
        <ContentText
          isTitle
          value={title}
          placeholder='카테고리 이름을 입력하세요.'
          onChange={setTitle}
          style={{ marginBottom: '2rem' }}
        />
        <ContentDropdown
          label='그룹'
          list={[...groupList, { id: 0, title: '그룹 미지정' }].map(group => ({ id: group.id, text: group.title }))}
          selected={group}
          placeholder='카테고리 그룹을 선택하세요.'
          onSelect={setGroup}
        />
        <ContentNumber label='예산' isNatural placeholder='예산을 입력하세요.' value={budget} onChange={setBudget} />
        <ContentTextarea label='메모' value={memo} placeholder='메모를 입력하세요.' onChange={setMemo} />
      </Modal.Content>
      <Modal.Footer flex padding>
        {initCategory && (
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

export default CategoryFormModal;
