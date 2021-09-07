import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Month } from 'types';

const initialState = {
  monthes: [] as Month[],
}

export const monthSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMonths: (state, { payload }: PayloadAction<Month[]>) => {
      state.monthes = payload;
    },
    updateOrAddMonths: (state, { payload }: PayloadAction<Month[]>) => {
      const news: Month[] = [];
      for (const month of payload) {
        let isMatch = false;
        state.monthes = state.monthes.map(m => {
          if (m.id === month.id) {
            isMatch = true;
            return month;
          } else {
            return m;
          }
        });
        if (!isMatch) news.push(month);
      }
      state.monthes = [...state.monthes, ...news];
    },
  }
})

export const { setMonths, updateOrAddMonths } = monthSlice.actions;

export default monthSlice.reducer;
