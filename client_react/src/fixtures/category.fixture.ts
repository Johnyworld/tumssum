import { Category, CategoryGroup } from 'types';
import { isoStringNow } from './common';

export const fixtureCategoryItemA: Category = {
  id: 1,
  title: '휴대폰 요금',
  memo: '매월 10일 자동 결제',
  group: 1,
  user: 1,
  budget: 50_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
  accounts: [],
};

export const fixtureCategoryItemB: Category = {
  id: 2,
  title: '공과금',
  group: 1,
  user: 1,
  budget: 50_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
  accounts: [],
};

export const fixtureCategoryItemC: Category = {
  id: 3,
  title: '간식',
  group: 2,
  user: 1,
  budget: 70_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
  accounts: [],
};

export const fixtureCategoryItemD: Category = {
  id: 4,
  title: '경조사',
  user: 1,
  budget: 150_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
  accounts: [],
};

export const fixtureCategoryGroupA: CategoryGroup = {
  id: 1,
  title: '고정지출',
  user: 1,
  items: [fixtureCategoryItemA, fixtureCategoryItemB],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureCategoryGroupB: CategoryGroup = {
  id: 2,
  title: '용돈지출',
  user: 1,
  items: [fixtureCategoryItemC],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureCategoryGroupC: CategoryGroup = {
  id: 3,
  title: '자기계발',
  user: 1,
  items: [],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureCategoryTree = [fixtureCategoryGroupA, fixtureCategoryGroupB, fixtureCategoryGroupC];

export const fixtureCategories = [
  fixtureCategoryItemA,
  fixtureCategoryItemB,
  fixtureCategoryItemC,
  fixtureCategoryItemD,
];

export const fixtureBudgets = [
  {
    id: 1,
    budget: 50_000,
    user: 1,
    date: '2022-02',
    category: 1,
    created_at: isoStringNow,
    updated_at: isoStringNow,
  },
  {
    id: 2,
    budget: 50_000,
    user: 1,
    date: '2022-02',
    category: 2,
    created_at: isoStringNow,
    updated_at: isoStringNow,
  },
  {
    id: 3,
    budget: 70_000,
    user: 1,
    date: '2022-02',
    category: 3,
    created_at: isoStringNow,
    updated_at: isoStringNow,
  },
  {
    id: 4,
    budget: 150_000,
    user: 1,
    date: '2022-02',
    category: 4,
    created_at: isoStringNow,
    updated_at: isoStringNow,
  },
];
