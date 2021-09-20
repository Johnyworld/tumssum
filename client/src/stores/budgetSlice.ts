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
  }
})

export const { setBudgets, addOrUpdateBudget } = budgetSlice.actions

export default budgetSlice.reducer;
