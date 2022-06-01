import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomDate from '~/utils/CustomDate';

const now = new CustomDate();

const initialState = {
  yyyymm: now.getLocalYYYYMM(),
};

export const budgetSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setCalendarMonth: (state, { payload }: PayloadAction<string>) => {
      state.yyyymm = payload;
    },
    modifyMonth: (state, { payload }: PayloadAction<number>) => {
      const then = new CustomDate(state.yyyymm);
      then.setMonth(payload);
      state.yyyymm = then.getLocalYYYYMM();
    },
  },
});

export const { setCalendarMonth, modifyMonth } = budgetSlice.actions;

export default budgetSlice.reducer;
