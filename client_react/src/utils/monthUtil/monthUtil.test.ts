import {
  fixtureMonthA,
  fixtureMonthC,
  fixtureMonthF,
  fixtureMonths,
  fixtureMonthsUser1,
} from '~/fixtures/month.fixrure';
import dateUtil from '../dateUtil';
import monthUtil, { getOldestMonth, findMonth } from './monthUtil';

test('tests getOldestMonth function', () => {
  expect(getOldestMonth(fixtureMonthsUser1)).toEqual({ bank: 1, date: '2021-07' });
  expect(getOldestMonth([])).toEqual(null);
});

test('tests findMonth function', () => {
  expect(findMonth(fixtureMonthsUser1, '2022-08', dateUtil.getMonthCount('2022-08', '2021-07'))).toEqual(fixtureMonthA);
});

test('tests getCurrentMonth function', () => {
  expect(monthUtil.getCurrentMonth(fixtureMonths, 1, '2022-08')).toEqual(fixtureMonthA);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 1, '2021-12')).toEqual(fixtureMonthC);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 2, '2022-08')).toEqual(fixtureMonthF);
  expect(monthUtil.getCurrentMonth(fixtureMonths, 3, '2022-08')).toEqual(null);
});
