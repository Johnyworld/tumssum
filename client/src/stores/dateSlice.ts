import { createSlice } from '@reduxjs/toolkit';
import { getLocalString } from '~utils/calendar';
import numberUtils from '~utils/numberUtils';

const initialState = {
  currentDate: getLocalString().substr(0, 7)
}


const getMonth = (yyyymm: string, sum: number) => {
	const split = yyyymm.split('-');
	const yyyy = +split[0];
	const mm = +split[1];

	let month = mm + sum;

	if (month < 1) {
		month += 12;
		return `${yyyy-1}-${numberUtils.getZeroNumber(month)}`

	} else if (month > 12) {
		month -= 12;
		return `${yyyy+1}-${numberUtils.getZeroNumber(month)}`

	} else {
		return `${yyyy}-${numberUtils.getZeroNumber(month)}`
	}
}


export const dateSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
		changeMonthPrev: (state) => {
			state.currentDate = getMonth(state.currentDate, -1);
		},
		changeMonthNext: (state) => {
			state.currentDate = getMonth(state.currentDate, +1);
		},
		changeMonthToday: (state) => {
			state.currentDate = getLocalString();
		}
  }
})

export const { changeMonthNext, changeMonthPrev, changeMonthToday } = dateSlice.actions

export default dateSlice.reducer;
