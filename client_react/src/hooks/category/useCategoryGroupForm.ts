import { useCallback, useState } from 'react';
import { CategoryGroup } from 'types';
import { addCategories, addCategoryGroup, removeCategoryGroup, updateCategoryGroup } from '~/stores/categorySlice';
import api from '~/utils/api';
import { useDispatch } from '~/utils/reduxHooks';
import useObject from '../useObject';
import useToast from '../useToast';
import useToggle from '../useToggle';

const useCategoryGroupForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isOpen, onOpen, onClose] = useToggle();

  const editingGroup = useObject<CategoryGroup>();

  const [isUpdating, setUpdating] = useState(false);

  const handleUpdateCategoryGroup = useCallback(
    async (group: CategoryGroup) => {
      const { id: category_group_id, title } = group;
      const { ok, message, data } = await api.categories.updateCategoryGroup({ category_group_id, title });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 수정했습니다.', 'green');
        dispatch(updateCategoryGroup(data));
        editingGroup.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingGroup, toast]
  );

  const handleCreateCategoryGroup = useCallback(
    async (group: CategoryGroup) => {
      const { title } = group;
      const { ok, message, data } = await api.categories.createCategoryGroup({ title });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 추가했습니다.', 'green');
        dispatch(addCategoryGroup(data));
        onClose();
      }
      setUpdating(false);
    },
    [dispatch, onClose, toast]
  );

  const onSubmit = useCallback(
    async (group: CategoryGroup) => {
      if (isUpdating) return;
      setUpdating(true);
      if (group.id) handleUpdateCategoryGroup(group);
      else handleCreateCategoryGroup(group);
      setUpdating(false);
    },
    [isUpdating, handleCreateCategoryGroup, handleUpdateCategoryGroup]
  );

  const onDelete = useCallback(
    async (category_group_id: number) => {
      if (isUpdating) return;
      setUpdating(true);
      const { ok, message, data } = await api.categories.deleteCategoryGroup({ category_group_id });
      if (!ok) toast(message, 'red');
      else {
        toast('뱅크 그룹을 삭제했습니다.', 'green');
        dispatch(removeCategoryGroup(data.id));
        dispatch(addCategories(data.items));
        editingGroup.reset();
      }
      setUpdating(false);
    },
    [dispatch, editingGroup, toast, isUpdating]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    if (editingGroup.data) editingGroup.reset();
  }, [editingGroup, onClose]);

  return {
    selected: editingGroup.data,
    isUpdating,
    isOpenModal: isOpen || !!editingGroup.data,
    onSelect: editingGroup.set,
    onCloseModal,
    onOpenModal: onOpen,
    onDelete,
    onSubmit,
  };
};

export default useCategoryGroupForm;
