import { Budget, Category, CategoryGroup } from 'types';
import budgetUtil from '../budgetUtil';

type CategoryAligned = { [x: string]: Category[] };
type GetCategoryTree = (groups: CategoryGroup[], categories: Category[], budgets: Budget[]) => CategoryGroup[];
type GetCategoryAligned = (categories: Category[], budgets: Budget[]) => CategoryAligned;

/**
 * @returns CategoryTree
 * 그룹 미지정의 Category[]는 id와 items만 존재하는 { id: 0, items: Category[] } 로 저장 됩니다.
 */
export const getCategoryTree: GetCategoryTree = (groups, categories, budgets) => {
  if (groups.length === 0 && categories.length === 0) return [];
  const aligned = getCategoryAligned(categories, budgets);
  const noGroupItems = { id: 0, items: aligned.EMPTY || [] } as CategoryGroup;
  const categoryGroups: CategoryGroup[] = groups.map(group => ({ ...group, items: aligned[group.id] || [] }));
  return [...categoryGroups, noGroupItems];
};

/**
 * category_id 로 Category 정렬합니다.
 */
export const getCategoryAligned: GetCategoryAligned = (categories, budgets) => {
  const results: CategoryAligned = {};
  for (const item of categories) {
    const key = item.group || 'EMPTY';
    const budget = budgetUtil.getCurrentBudget(budgets, item.id);
    if (!results[key]) results[key] = [];
    results[key].push({ ...item, budget: budget?.budget || 0 });
  }
  return results;
};

const categoryUtil = { getCategoryTree };

export default categoryUtil;
