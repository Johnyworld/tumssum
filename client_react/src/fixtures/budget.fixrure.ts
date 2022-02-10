import { Budget } from 'types';

const budgetA = { category: 1, date: '2022-02', budget: 100_000 } as Budget;
const budgetB = { category: 1, date: '2022-01' } as Budget;
const budgetC = { category: 1, date: '2021-09' } as Budget;
const budgetD = { category: 1, date: '2021-07' } as Budget;
const budgetE = { category: 2, date: '2021-05' } as Budget;
const budgetF = { category: 2, date: '2022-03' } as Budget;

export const fixtureBudgetA = budgetA;
export const fixtureBudgetC = budgetC;
export const fixtureBudgetF = budgetF;
export const fixtureBudgetsUser1 = [budgetA, budgetB, budgetD, budgetC];
export const fixtureBudgets = [...fixtureBudgetsUser1, budgetE, budgetF];
