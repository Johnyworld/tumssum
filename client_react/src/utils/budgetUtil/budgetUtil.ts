import { Budget } from 'types';
import CustomDate from '../CustomDate';
import dateUtil from '../dateUtil';

type GetCurrentBudget = (budgets: Budget[], category_id: number, yyyymm?: string) => Budget | null;
type GetOldestBudget = (budgets: Budget[]) => Budget | null;
type FindBudget = (filteredBudgets: Budget[], yyyymm: string, count: number) => Budget | null;

const getCurrentBudget: GetCurrentBudget = (months, category_id, yyyymm?) => {
  const currentDate = yyyymm || new CustomDate().getLocalYearMonth();
  const filtered = months.filter(month => month.category === category_id);
  if (!filtered.length) return null;
  else {
    const oldestMonth = getOldestBudget(filtered)?.date || currentDate;
    const count = dateUtil.getMonthCount(currentDate, oldestMonth);
    return findBudget(filtered, currentDate, count);
  }
};

/**
 * Month[] 데이터에서 가장 최근 날짜와 가장 오래된 날짜를 반환
 */
export const getOldestBudget: GetOldestBudget = months => {
  if (!months.length) return null;
  if (months.length === 1) return months[0];
  const sorted = months.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sorted[sorted.length - 1];
};

/**
 * - 가장 최근 날짜에서 가장 오래된 날짜를 계산해서 총 몇개월을 반복할 수 있는지 계산해야 함
 * - 배열에 조회하는 날짜보다 최신 날짜들만 존재할 경우 무한 반복될 수 있음.
 */
export const findBudget: FindBudget = (filteredMonths, yyyymm, count) => {
  if (count <= 0) return null;
  const exists = filteredMonths.find(month => month.date === yyyymm);
  if (exists) return exists;
  else {
    const then = new CustomDate(yyyymm);
    then.setMonth(-1);
    return findBudget(filteredMonths, then.getLocalYearMonth(), count - 1);
  }
};

const budgetUtil = { getCurrentBudget };

export default budgetUtil;
