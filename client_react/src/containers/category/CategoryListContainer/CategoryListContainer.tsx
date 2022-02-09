import React from 'react';
import Button from '~/components/atoms/Button';
import CategoryList from '~/components/molecules/lists/CategoryList';
import categoryUtil from '~/utils/categoryUtil';
import { useSelector } from '~/utils/reduxHooks';
// import './CategoryListContainer.scss';

export interface CategoryListContainerProps {}

const CategoryListContainer: React.FC<CategoryListContainerProps> = ({}) => {
  const categoryGroups = useSelector(state => state.category.categoryGroups);
  const categories = useSelector(state => state.category.categories);
  const categoryTree = categoryUtil.getCategoryTree(categoryGroups, categories);

  // const categoryForm = useBankForm();
  // const categoryGroupForm = useBankGroupForm();

  return (
    <div className='category-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' children='그룹 추가하기' />
        <Button size='small' children='카테고리 추가하기' />
      </div>

      <CategoryList categoryTree={categoryTree} />
    </div>
  );
};

export default CategoryListContainer;
