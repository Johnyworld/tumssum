import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from 'types';

const initialState = {
  budgets: [] as Budget[],
}


export const budgetSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
		setBudgets: (state, { payload }: PayloadAction<Budget[]>) => {
			state.budgets = payload;
		},
		addOrUpdateBudget: (state, { payload }: PayloadAction<Budget>) => {
			let exists = false;
			state.budgets = state.budgets.map(budget => {
				if (budget.id === payload.id) {
					exists = true;
					return {
						...budget,
						...payload,
					}
				}
				else return budget;
			});
			if ( !exists ) {
				state.budgets = [ ...state.budgets, payload ];
			}
		},
		removeBudget: (state, { payload }: PayloadAction<number>) => {
			state.budgets = state.budgets.filter(budget => budget.id !== payload);
		},
  }
})

export const { setBudgets, addOrUpdateBudget, removeBudget } = budgetSlice.actions

export default budgetSlice.reducer;
