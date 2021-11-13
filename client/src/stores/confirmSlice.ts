import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ConfirmItem {
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
