import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConfirmType = 'confirm';

interface ConfirmItem {
	type: ConfirmType;
	message: string;
	callback?: () => void;
}

interface InitialState {
	confirm: ConfirmItem | null;
}

const initialState: InitialState = {
  confirm: null,
}

export const confirmSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		openConfirm: (state, {payload}: PayloadAction<ConfirmItem>) => {
			state.confirm = payload;
		},
		closeConfirm: (state) => {
			state.confirm = null;
		}
	}
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
