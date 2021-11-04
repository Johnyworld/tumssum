import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertItem {
	message: string;
	callback?: () => void;
}

interface InitialState {
	alert: AlertItem | null;
}

const initialState: InitialState = {
  alert: null,
}

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		openAlert: (state, {payload}: PayloadAction<AlertItem>) => {
			state.alert = payload;
		},
		closeAlert: (state) => {
			state.alert = null;
		}
	}
});

export const { openAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
