import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMonthDate } from '~utils/calendar';

const initialState = {
  date: new Date().toISOString(),
}


export const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
		changeMonthPrev: (state) => {
			state.date = getMonthDate(state.date, -1);
		},
		changeMonthNext: (state) => {
			state.date = getMonthDate(state.date, +1);
		},
		changeMonthToday: (state) => {
			state.date = new Date().toISOString();
		}
  }
})

export const { changeMonthNext, changeMonthPrev, changeMonthToday } = monthSlice.actions

export default monthSlice.reducer;
