import { useCallback, useState } from 'react';
import { useDispatch } from '~/utils/reduxHooks';
import useToast from '../useToast';
import { Category } from 'types';
import api from '~/utils/api';
import useToggle from '../useToggle';
import useObject from '../useObject';
import { addCategory, removeCategory, updateCategory } from '~/stores/categorySlice';

const useCategoryForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isOpen, onOpen, onClose] = useToggle();

  const editingCategory = useObject<Category>();

  const [isUpdating, setUpdating] = useState(false);

  const handleUpdateCategory = useCallback(
    async (category: Category) => {
      const { id: category_id, title, memo, budget, group: category_group_id } = category;
      const { ok, message, data } = await api.categories.updateCategory({
        category_id,
        title,
        memo,
        budget,
        category_group_id,
        yyyymm: '2022-02',
      });
      if (!ok) toast(message, 'red');
      else {
        toast('카테고리를 수정했습니다.', 'green');
        dispatch(updateCategory(data.category));
        editingCategory.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingCategory, toast]
  );

  const handleCreateCategory = useCallback(
    async (category: Category) => {
      const { title, memo, budget, group: category_group_id } = category;
      const { ok, message, data } = await api.categories.createCategory({
        title,
        memo,
        budget,
        category_group_id,
        yyyymm: '2022-02',
      });
      if (!ok) toast(message, 'red');
      else {
        toast('카테고리를 추가했습니다.', 'green');
        dispatch(addCategory(data.category));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const onSubmit = useCallback(
    async (category: Category) => {
      if (isUpdating) return;
      setUpdating(true);
      if (category.id) await handleUpdateCategory(category);
      else await handleCreateCategory(category);
      setUpdating(false);
    },
    [handleCreateCategory, handleUpdateCategory, isUpdating]
  );

  const onDelete = useCallback(
    async (category_id: number) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.categories.deleteCategory({ category_id });
      if (!ok) toast(message, 'red');
      else {
        toast('카테고리를 삭제했습니다.', 'green');
        dispatch(removeCategory(data));
        editingCategory.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingCategory, toast, isUpdating]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    if (editingCategory.data) editingCategory.reset();
  }, [editingCategory, onClose]);

  return {
    selected: editingCategory.data,
    isUpdating,
    isOpenModal: isOpen || !!editingCategory.data,
    onSelect: editingCategory.set,
    onCloseModal,
    onOpenModal: onOpen,
    onDelete,
    onSubmit,
  };
};

export default useCategoryForm;
