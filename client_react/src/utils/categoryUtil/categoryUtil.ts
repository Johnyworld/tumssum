import { Budget, Category, CategoryGroup } from 'types';
import numberUtil from '../numberUtil';

type CategoryAligned = { [x: string]: Category[] };

/** public */
type GetCategoryTree = (groups: CategoryGroup[], categories: Category[], budgets: Budget[]) => CategoryGroup[];
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

/** private */
type GetCategoryAligned = (categories: Category[], budgets: Budget[]) => CategoryAligned;
/**
 * category_id 로 Category 정렬합니다.
 */
export const getCategoryAligned: GetCategoryAligned = (categories, budgets) => {
  const results: CategoryAligned = {};
  for (const item of categories) {
    const key = item.group || 'EMPTY';
    const budget = getBudgetOfCategory(item.id, budgets, '2022-02');
    if (!results[key]) results[key] = [];
    results[key].push({ ...item, budget });
  }
  return results;
};

/** private */
type GetBudgetOfCategory = (category_id: number, budgets: Budget[], currentDate: string) => number | undefined;
/**
 * 현재 날짜에서 가장 가까운 날짜이며 category_id가 일치하는 budget의 값을 리턴한다.
 */
export const getBudgetOfCategory: GetBudgetOfCategory = (category_id, budgets, currentDate) => {
  const filtered = budgets.filter(budget => budget.category === category_id);
  if (filtered.length) return findBudgetWithDate(filtered, currentDate)?.budget;
  else return undefined;
};

/** private */
type FindBudgetWithDate = (budgets: Budget[], currentDate: string, count?: number) => Budget | null;
export const findBudgetWithDate: FindBudgetWithDate = (budgets, currentDate, count = 12) => {
  const exists = budgets.find(budget => budget.date === currentDate);
  if (exists) return exists;
  if (count <= 0) return null;
  else {
    const split = currentDate.split('-');
    const Y = +split[0];
    const M = +split[1];
    const date = `${M === 1 ? Y - 1 : Y}-${M === 1 ? 12 : numberUtil.getZeroNumber(M - 1)}`;
    return findBudgetWithDate(budgets, date, count - 1);
  }
};

const categoryUtil = { getCategoryTree };

export default categoryUtil;
