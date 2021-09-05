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
    updateOrAddMonths: (state, { payload }: PayloadAction<Month[]>) => {
      // const exists = state.monthes.find(month => month.id === payload.id);
      // if (exists) {
      //   state.monthes = state.monthes.map(month => month.id === payload.id ? payload : month);
      // } else {
      //   state.monthes = [ ...state.monthes, payload ];
      // }
    },
  }
})

export const { setBankMonthes, updateOrAddMonths } = bankMonth.actions;

export default bankMonth.reducer;
