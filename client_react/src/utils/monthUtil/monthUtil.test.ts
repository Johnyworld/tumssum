import {
  fixtureMonthA,
  fixtureMonthC,
  fixtureMonthF,
  fixtureMonths,
  fixtureMonthsUser1,
} from '~/fixtures/month.fixrure';
import monthUtil, { getOldestMonth, getMonthCount, findMonth } from './monthUtil';

test('tests getOldestMonth function', () => {
  expect(getOldestMonth(fixtureMonthsUser1)).toEqual({ bank: 1, date: '2021-07' });
  expect(getOldestMonth([])).toEqual(null);
});

test('tests getMonthCount function', () => {
  expect(getMonthCount('2022-02', '2021-07')).toEqual(8);
  expect(getMonthCount('2021-07', '2022-02')).toEqual(8);
  expect(getMonthCount('2022-05', '2022-05')).toEqual(1);
  expect(getMonthCount('2022-05', '2020-01')).toEqual(29); // 12 + 12 + 5
  expect(getMonthCount('2022-02', '2021-07', '2023-05')).toEqual(8); // 3번째 인자부터 무시됨
  expect(getMonthCount('2022-02')).toEqual(0); // 인자가 2개 이하면 0을 리턴
  expect(getMonthCount()).toEqual(0); // 인자가 2개 이하면 0을 리턴
  expect(getMonthCount('2022', '2021')).toEqual(NaN); // 형식이 맞지 않으면 NaN이 리턴 됨.
});

test('tests findMonth function', () => {
  expect(findMonth(fixtureMonthsUser1, '2022-08', getMonthCount('2022-08', '2021-07'))).toEqual(fixtureMonthA);
});

test('tests getCurrentMonth function', () => {
  expect(monthUtil.getCurrentMonth(fixtureMonths, 1, '2022-08')).toEqual(fixtureMonthA);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 1, '2021-12')).toEqual(fixtureMonthC);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 2, '2022-08')).toEqual(fixtureMonthF);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 3, '2022-08')).toEqual(null);
});
