import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  date: new Date().toISOString(),
}

const getMonthDate = (date: string, sum: number) => {
	const then = new Date(date);
	then.setMonth(then.getMonth() + sum);
	return then.toISOString();
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
