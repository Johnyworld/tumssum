import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Month } from 'types';

const initialState = {
  monthes: [] as Month[],
}

export const bankMonth = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setBankMonthes: (state, { payload }: PayloadAction<Month[]>) => {
      state.monthes = payload;
    },
  }
})

export const { setBankMonthes } = bankMonth.actions;

export default bankMonth.reducer;
