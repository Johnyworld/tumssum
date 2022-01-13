import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
	message: string;
}

const initialState: InitialState = {
  message: '',
}

export const confirmSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		openConfirm: (state, {payload}: PayloadAction<string>) => {
			state.message = payload;
		},
		closeConfirm: (state) => {
			state.message = '';
		}
	}
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
