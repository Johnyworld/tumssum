import React from 'react';
import Button from '~/components/atoms/Button';
import CategoryList from '~/components/molecules/lists/CategoryList';
import CategoryFormModal from '~/components/organisms/category/CategoryFormModal';
import Modal from '~/components/organisms/modals/Modal';
import useCategoryForm from '~/hooks/category/useCategoryForm';
import categoryUtil from '~/utils/categoryUtil';
import { useSelector } from '~/utils/reduxHooks';

export interface CategoryListContainerProps {}

const CategoryListContainer: React.FC<CategoryListContainerProps> = ({}) => {
  const categoryGroups = useSelector(state => state.category.categoryGroups);
  const categories = useSelector(state => state.category.categories);
  const categoryTree = categoryUtil.getCategoryTree(categoryGroups, categories);

  const categoryForm = useCategoryForm();

  return (
    <div className='category-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' children='그룹 추가하기' />
        <Button size='small' children='카테고리 추가하기' onClick={categoryForm.onOpenModal} />
      </div>

      <CategoryList categoryTree={categoryTree} onClickCategory={categoryForm.onSelect} />

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
    </div>
  );
};

export default CategoryListContainer;
