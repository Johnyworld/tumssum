import { Bank, BankGroup, BankTree } from 'types';
import { isoStringNow } from './common';

export const fixtureBankItemA: Bank = {
  id: 1,
  title: 'My Bank A',
  memo: 'memo',
  group: 1,
  user: 1,
  balance: 300_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankItemB: Bank = {
  id: 2,
  title: 'My Bank B',
  group: 1,
  user: 1,
  balance: -100_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankGroupA: BankGroup = {
  id: 1,
  title: 'My Bank Group A',
  user: 1,
  items: [fixtureBankItemA, fixtureBankItemB],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankGroupB: BankGroup = {
  id: 2,
  title: 'My Bank Group B',
  user: 1,
  items: [],
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankTree: BankTree = [fixtureBankGroupA, fixtureBankGroupB];
