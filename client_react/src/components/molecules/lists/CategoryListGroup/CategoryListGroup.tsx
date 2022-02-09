import React from 'react';
import { Category, CategoryGroup } from 'types';
import { c } from '~/utils/classNames';
import CategoryListItem from '../CategoryListItem';
import './CategoryListGroup.scss';

export interface CategoryListGroupProps {
  categoryGroup: CategoryGroup;
  onClickCategory?: (bank: Category) => void;
  onClickGroup?: (group: CategoryGroup) => void;
}

const CategoryListGroup: React.FC<CategoryListGroupProps> = ({ categoryGroup, onClickCategory, onClickGroup }) => {
  const { id, title, items } = categoryGroup;
  const isGroupUnspecified = !id;
  return (
    <div className='category-list-group'>
      <p
        className={c('category-list-group__title', [!title, '&--disabled'], [!isGroupUnspecified, '&--clickable'])}
        onClick={onClickGroup && !isGroupUnspecified ? () => onClickGroup(categoryGroup) : undefined}
      >
        {isGroupUnspecified ? '그룹 미지정' : title || '이름 없음'}
      </p>

      <ul className='category-list-group__list'>
        {!items?.length ? (
          <p className='category-list-group__placeholder'>비어있음</p>
        ) : (
          items.map(category => (
            <CategoryListItem
              key={category.id}
              category={category}
              onClick={onClickCategory ? () => onClickCategory(category) : undefined}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryListGroup;
