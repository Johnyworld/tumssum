import {
  fixtureCategoryGroupA,
  fixtureCategoryGroupB,
  fixtureCategories,
  fixtureBudgets,
} from '~/fixtures/category.fixture';
import { isoStringNow } from '~/fixtures/common';
import { getCategoryAligned, getCategoryTree, findBudgetWithDate } from './categoryUtil';

/**
 * testing getBankAligned function
 * testing getBankTree function
 */

test('testing getCategoryAligned function', () => {
  expect(getCategoryAligned(fixtureCategories, fixtureBudgets)).toEqual({
    1: [fixtureCategories[0], fixtureCategories[1]],
    2: [fixtureCategories[2]],
    EMPTY: [fixtureCategories[3]],
  });
});

test('testing getCategoryTree function', () => {
  expect(getCategoryTree([fixtureCategoryGroupA, fixtureCategoryGroupB], fixtureCategories, fixtureBudgets)).toEqual([
    { ...fixtureCategoryGroupA, items: [fixtureCategories[0], fixtureCategories[1]] },
    { ...fixtureCategoryGroupB, items: [fixtureCategories[2]] },
    { id: 0, items: [fixtureCategories[3]] },
  ]);
});

test('testing findBudgetWithDate function', () => {
  expect(findBudgetWithDate(fixtureBudgets, '2022-02')).toEqual({
    id: 1,
    budget: 50_000,
    user: 1,
    date: '2022-02',
    category: 1,
    created_at: isoStringNow,
    updated_at: isoStringNow,
  });
});
