import {
  fixtureBudgetA,
  fixtureBudgetC,
  fixtureBudgetF,
  fixtureBudgets,
  fixtureBudgetsUser1,
} from '~/fixtures/budget.fixrure';
import dateUtil from '../dateUtil';
import budgetUtil, { getOldestBudget, findBudget } from './budgetUtil';

test('tests getOldestBudget function', () => {
  expect(getOldestBudget(fixtureBudgetsUser1)).toEqual({ category: 1, date: '2021-07' });
  expect(getOldestBudget([])).toEqual(null);
});

test('tests findBudget function', () => {
  expect(findBudget(fixtureBudgetsUser1, '2022-08', dateUtil.getMonthCount('2022-08', '2021-07'))).toEqual(
    fixtureBudgetA
  );
});

test('tests getCurrentBudget function', () => {
  expect(budgetUtil.getCurrentBudget(fixtureBudgets, 1, '2022-08')).toEqual(fixtureBudgetA);
  expect(budgetUtil.getCurrentBudget(fixtureBudgets, 1, '2021-12')).toEqual(fixtureBudgetC);
  expect(budgetUtil.getCurrentBudget(fixtureBudgets, 2, '2022-08')).toEqual(fixtureBudgetF);
  expect(budgetUtil.getCurrentBudget(fixtureBudgets, 3, '2022-08')).toEqual(null);
});
