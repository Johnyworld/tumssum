import React from 'react';
import Button from '~/components/atoms/Button';
import CategoryList from '~/components/molecules/lists/CategoryList';
import CategoryFormModal from '~/components/organisms/category/CategoryFormModal';
import CategoryGroupFormModal from '~/components/organisms/category/CategoryGroupFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useCategoryForm from '~/hooks/category/useCategoryForm';
import useCategoryGroupForm from '~/hooks/category/useCategoryGroupForm';
import categoryUtil from '~/utils/categoryUtil';
import { useSelector } from '~/utils/reduxHooks';

const CategoryListContainer: React.FC = () => {
  const categoryGroups = useSelector(state => state.category.categoryGroups);
  const categories = useSelector(state => state.category.categories);
  const budgets = useSelector(state => state.budget.budgets);
  const categoryTree = categoryUtil.getCategoryTree(categoryGroups, categories, budgets);

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
        children={
          <CategoryFormModal
            groupList={categoryGroups}
            isUpdating={categoryForm.isUpdating}
            initCategory={categoryForm.selected}
            onSubmit={categoryForm.onSubmit}
            onDelete={categoryForm.onDelete}
            onClose={categoryForm.onCloseModal}
          />
        }
      />

      <Modal
        isOpen={categoryGroupForm.isOpenModal}
        children={
          <CategoryGroupFormModal
            isUpdating={categoryGroupForm.isUpdating}
            initGroup={categoryGroupForm.selected}
            onSubmit={categoryGroupForm.onSubmit}
            onDelete={categoryGroupForm.onDelete}
            onClose={categoryGroupForm.onCloseModal}
          />
        }
      />
    </div>
  );
};

export default CategoryListContainer;
