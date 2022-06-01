import { Month } from 'types';
import CustomDate from '../CustomDate';
import dateUtil from '../dateUtil';

type GetCurrentMonth = (months: Month[], bank_id: number, yyyymm?: string) => Month | null;
type GetOldestMonth = (months: Month[]) => Month | null;
type FindMonth = (filteredMonths: Month[], yyyymm: string, count: number) => Month | null;

const getCurrentMonth: GetCurrentMonth = (months, bank_id, yyyymm?) => {
  const currentDate = yyyymm || new CustomDate().getLocalYYYYMM();
  const filtered = months.filter(month => month.bank === bank_id);
  if (!filtered.length) return null;
  else {
    const oldestMonth = getOldestMonth(filtered)?.date || currentDate;
    const count = dateUtil.getMonthCount(currentDate, oldestMonth);
    return findMonth(filtered, currentDate, count);
  }
};

/**
 * Month[] 데이터에서 가장 최근 날짜와 가장 오래된 날짜를 반환
 */
export const getOldestMonth: GetOldestMonth = months => {
  if (!months.length) return null;
  if (months.length === 1) return months[0];
  const sorted = months.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sorted[sorted.length - 1];
};

/**
 * - 가장 최근 날짜에서 가장 오래된 날짜를 계산해서 총 몇개월을 반복할 수 있는지 계산해야 함
 * - 배열에 조회하는 날짜보다 최신 날짜들만 존재할 경우 무한 반복될 수 있음.
 */
export const findMonth: FindMonth = (filteredMonths, yyyymm, count) => {
  if (count <= 0) return null;
  const exists = filteredMonths.find(month => month.date === yyyymm);
  if (exists) return exists;
  else {
    const then = new CustomDate(yyyymm);
    then.setMonth(-1);
    return findMonth(filteredMonths, then.getLocalYYYYMM(), count - 1);
  }
};

const monthUtil = {
  getCurrentMonth,
};

export default monthUtil;
