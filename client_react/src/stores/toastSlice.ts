import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChromaticColor } from 'types';

export interface ToastItem {
	id: number;
	index: number;
	message: string;
	color: ChromaticColor;
}

interface ToastItemCreate {
	message: string;
	color: ChromaticColor;
}

const initialState = {
	id: 1,
  toasts: [] as ToastItem[],
}

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		addToast: (state, {payload}: PayloadAction<ToastItemCreate>) => {
			state.toasts = [ ...state.toasts, { ...payload, id: state.id, index: state.toasts.length } ];
			state.id = state.id+1;
		},
		removeToast: (state, {payload}: PayloadAction<number>) => {
			const index = state.toasts.find(toast=> toast.id === payload)?.index || 0;
			state.toasts = state.toasts
				.filter(toast=> toast.id !== payload)
				.map(toast=> toast.index < index ? toast : { ...toast, index: toast.index -1 });
		},
	}
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
