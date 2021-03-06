import React from 'react';
import Button from '~/components/atoms/Button';
import CategoryList from '~/components/molecules/lists/CategoryList';
import CategoryFormModal from '~/components/organisms/category/CategoryFormModal';
import CategoryGroupFormModal from '~/components/organisms/category/CategoryGroupFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useCategoryForm from '~/hooks/category/useCategoryForm';
import useCategoryGroupForm from '~/hooks/category/useCategoryGroupForm';
import useCategoryTree from '~/hooks/category/useCategoryTree';
import { useSelector } from '~/utils/reduxHooks';

const CategoryListContainer: React.FC = () => {
  const categoryTree = useCategoryTree();
  const categoryGroups = useSelector(state => state.category.categoryGroups);

  const categoryForm = useCategoryForm();
  const categoryGroupForm = useCategoryGroupForm();

  return (
    <div className='category-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' children='그룹 추가하기' onClick={categoryGroupForm.onOpenModal} />
        <Button size='small' children='카테고리 추가하기' onClick={categoryForm.onOpenModal} />
      </div>

      <CategoryList
        categoryTree={categoryTree}
        onClickCategory={categoryForm.onSelect}
        onClickGroup={categoryGroupForm.onSelect}
      />

      <Modal
        isOpen={categoryForm.isOpenModal}
        onClose={categoryForm.onCloseModal}
        children={
          <CategoryFormModal
            groupList={categoryGroups}
            isUpdating={categoryForm.isUpdating}
            initCategory={categoryForm.selected}
            onSubmit={categoryForm.onSubmit}
            onDelete={categoryForm.onDelete}
          />
        }
      />

      <Modal
        isOpen={categoryGroupForm.isOpenModal}
        onClose={categoryGroupForm.onCloseModal}
        children={
          <CategoryGroupFormModal
            isUpdating={categoryGroupForm.isUpdating}
            initGroup={categoryGroupForm.selected}
            onSubmit={categoryGroupForm.onSubmit}
            onDelete={categoryGroupForm.onDelete}
          />
        }
      />
    </div>
  );
};

export default CategoryListContainer;
