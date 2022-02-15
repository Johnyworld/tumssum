type GetMonthCount = (...args: string[]) => number;
type GetIsLeap = (year: number) => boolean;

/**
 * 두 날짜 포함하여 그 사이에 몇개의 개월이 존재하는지 계산.
 * @param dates ['2021-09', '2021-08']
 */
export const getMonthCount: GetMonthCount = (...args) => {
  if (args.length < 2) return 0; // 인자가 2개 이하면 0을 리턴
  const [old, recent] = args.sort();
  const [recentYear, recentMonth] = recent.split('-');
  const [oldYear, oldMonth] = old.split('-');
  const sumYear = +recentYear - +oldYear; // 0 ~
  const sumMonth = +recentMonth - +oldMonth; // -11 ~ 11
  return sumYear * 12 + sumMonth + 1;
};

/**
 * 해당 연도가 윤년인지 리턴합니다.
 */
export const getIsLeap: GetIsLeap = year => {
  return (year % 4 === 0 && !(year % 100 === 0)) || year % 400 === 0;
};

const dateUtil = { getMonthCount, getIsLeap };

export default dateUtil;
