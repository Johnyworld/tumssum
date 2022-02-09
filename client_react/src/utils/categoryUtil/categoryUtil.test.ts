import { fixtureCategoryGroupA, fixtureCategoryGroupB, fixtureCategories } from '~/fixtures/category.fixture';
import { getCategoryAligned, getCategoryTree } from './categoryUtil';

/**
 * testing getBankAligned function
 * testing getBankTree function
 */

test('testing getCategoryAligned function', () => {
  expect(getCategoryAligned(fixtureCategories)).toEqual({
    1: [fixtureCategories[0], fixtureCategories[1]],
    2: [fixtureCategories[2]],
    EMPTY: [fixtureCategories[3]],
  });
});

test('testing getCategoryTree function', () => {
  expect(getCategoryTree([fixtureCategoryGroupA, fixtureCategoryGroupB], fixtureCategories)).toEqual([
    { ...fixtureCategoryGroupA, items: [fixtureCategories[0], fixtureCategories[1]] },
    { ...fixtureCategoryGroupB, items: [fixtureCategories[2]] },
    { id: 0, items: [fixtureCategories[3]] },
  ]);
});
