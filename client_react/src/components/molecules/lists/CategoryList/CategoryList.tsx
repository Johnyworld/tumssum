import React from 'react';
import { Category, CategoryGroup } from 'types';
import CategoryListGroup from '../CategoryListGroup';
import './CategoryList.scss';

export interface CategoryListProps {
  categoryTree: CategoryGroup[];
  onClickCategory?: (bank: Category) => void;
  onClickGroup?: (group: CategoryGroup) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryTree, onClickCategory, onClickGroup }) => {
  return (
    <div className='category-list'>
      {!categoryTree?.length ? (
        <p className='bank-list__placeholder'>카테고리가 없어요.</p>
      ) : (
        categoryTree.map(group => (
          <CategoryListGroup
            key={group.id}
            categoryGroup={group}
            onClickCategory={onClickCategory}
            onClickGroup={onClickGroup}
          />
        ))
      )}
    </div>
  );
};

export default CategoryList;
