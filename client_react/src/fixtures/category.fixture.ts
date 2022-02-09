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
  id: 1,
  title: '간식',
  group: 2,
  user: 1,
  budget: 70_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
  accounts: [],
};

export const fixtureCategoryGroupA: CategoryGroup = {
  id: 1,
  title: '고정지출',
  user: 1,
  items: [fixtureCategoryItemA],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureCategoryGroupB: CategoryGroup = {
  id: 2,
  title: '용돈지출',
  user: 1,
  items: [fixtureCategoryItemB],
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
