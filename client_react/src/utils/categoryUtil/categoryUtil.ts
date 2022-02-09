import { Category, CategoryGroup } from 'types';

type CategoryAligned = { [x: string]: Category[] };

/**
 * @returns CategoryTree
 * 그룹 미지정의 Category[]는 id와 items만 존재하는 { id: 0, items: Category[] } 로 저장 됩니다.
 */
export const getCategoryTree = (groups: CategoryGroup[], categories: Category[]) => {
  if (groups.length === 0 && categories.length === 0) return [];
  const aligned = getCategoryAligned(categories);
  const noGroupItems = { id: 0, items: aligned.EMPTY || [] } as CategoryGroup;
  const categoryGroups: CategoryGroup[] = groups.map(group => ({ ...group, items: aligned[group.id] || [] }));
  return [...categoryGroups, noGroupItems];
};

/**
 * category_id 로 Category 정렬합니다.
 * @returns {[category_id]: Category[]}
 */
export const getCategoryAligned = (categories: Category[]) => {
  const results: CategoryAligned = {};
  for (const item of categories) {
    const key = item.group || 'EMPTY';
    if (!results[key]) results[key] = [];
    results[key].push(item);
  }
  return results;
};

const categoryUtil = { getCategoryTree };

export default categoryUtil;
