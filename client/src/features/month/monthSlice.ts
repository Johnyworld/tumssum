import { createSlice } from '@reduxjs/toolkit';
import { getLocalString, getMonthDate } from '~utils/calendar';

const initialState = {
  date: getLocalString()
}


export const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
		changeMonthPrev: (state) => {
			state.date = getMonthDate(state.date, -1);
		},
		changeMonthNext: (state) => {
			console.log('===== monthSlice', getMonthDate(state.date, +1));
			state.date = getMonthDate(state.date, +1);
		},
		changeMonthToday: (state) => {
			state.date = getLocalString();
		}
  }
})

export const { changeMonthNext, changeMonthPrev, changeMonthToday } = monthSlice.actions

export default monthSlice.reducer;
