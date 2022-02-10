import { Account } from 'types';

export const fixtureAccountA = {
  id: 1,
  title: '아이스 아메리카노',
  memo: '얼음 동동 맛있는 아메리카노',
  account: -4_100,
} as Account;

export const fixtureAccountB = {
  id: 2,
  title: '용돈',
  account: 20_000,
} as Account;

export const fixtureAccountC = {
  id: 3,
  title: '',
} as Account;

export const fixtureAccounts = [fixtureAccountA, fixtureAccountB, fixtureAccountC];
