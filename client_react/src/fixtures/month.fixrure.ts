import { Month } from 'types';

const monthA = { bank: 1, date: '2022-02', balance: 100_000 } as Month;
const monthB = { bank: 1, date: '2022-01' } as Month;
const monthC = { bank: 1, date: '2021-09' } as Month;
const monthD = { bank: 1, date: '2021-07' } as Month;
const monthE = { bank: 2, date: '2021-05' } as Month;
const monthF = { bank: 2, date: '2022-03' } as Month;

export const fixtureMonthA = monthA;
export const fixtureMonthC = monthC;
export const fixtureMonthF = monthF;
export const fixtureMonthsUser1 = [monthA, monthB, monthD, monthC];
export const fixtureMonths = [...fixtureMonthsUser1, monthE, monthF];
