import { Bank, BankGroup, BankTree } from 'types';
import { isoStringNow } from './common';

export const fixtureBankItemA: Bank = {
  id: 1,
  title: 'My Bank A',
  memo: 'memo',
  group: 1,
  user: 1,
  balance: 100_000,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankItemB: Bank = {
  id: 2,
  title: 'My Bank B',
  group: 1,
  user: 1,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankItemC: Bank = {
  id: 3,
  title: 'My Bank B',
  group: 2,
  user: 1,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankItemD: Bank = {
  id: 4,
  title: 'My Bank B',
  user: 1,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBanks = [fixtureBankItemA, fixtureBankItemB, fixtureBankItemC, fixtureBankItemD];

export const fixtureBankGroupA: BankGroup = {
  id: 1,
  title: 'My Bank Group A',
  user: 1,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankGroupB: BankGroup = {
  id: 2,
  title: 'My Bank Group B',
  user: 1,
  created_at: isoStringNow,
  updated_at: isoStringNow,
};

export const fixtureBankTree: BankTree = [
  { ...fixtureBankGroupA, items: [fixtureBankItemA, fixtureBankItemB] },
  fixtureBankGroupB,
];
