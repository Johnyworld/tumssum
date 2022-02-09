import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from 'types';
import api from '~/utils/api';

export const getBudgets = createAsyncThunk('budgets/getBudgets', async (_, { rejectWithValue }) => {
  const { ok, message, data } = await api.budgets.getBudgets();
  if (!ok) throw rejectWithValue(message);
  else return data;
});

const initialState = {
  budgets: [] as Budget[],
  error: '',
  loaded: false,
};

export const budgetSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setBudgets: (state, { payload }: PayloadAction<Budget[]>) => {
      state.budgets = payload;
    },
    addOrUpdateOrRemoveBudget: (state, { payload }: PayloadAction<Budget | number>) => {
      if (typeof payload === 'number') {
        state.budgets = state.budgets.filter(budget => budget.id !== payload);
        return;
      }
      let exists = false;
      state.budgets = state.budgets.map(budget => {
        if (budget.id === payload.id) {
          exists = true;
          return {
            ...budget,
            ...payload,
          };
        } else return budget;
      });
      if (!exists) {
        state.budgets = [...state.budgets, payload];
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(getBudgets.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loaded = true;
    });
    builder.addCase(getBudgets.fulfilled, (state, { payload }) => {
      state.budgets = payload;
      state.error = '';
      state.loaded = true;
    });
  },
});

export const { setBudgets, addOrUpdateOrRemoveBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
