import React from 'react';
import { Category } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './CategoryListItem.scss';

export interface CategoryListItemProps {
  category: Category;
  onClick?: () => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ category, onClick }) => {
  const { title, memo, budget } = category;
  return (
    <div className={c('category-list-item', [!!onClick, '&--clickable'])} onClick={onClick}>
      <p className={c('category-list-item__title', [!title, '&--disabled'])}>{title || '이름 없음'}</p>
      <p className='category-list-item__memo'>{memo}</p>
      {!!budget && <p className={'category-list-item__budget'}>{numberUtil.getComma(budget)}</p>}
    </div>
  );
};

export default CategoryListItem;
