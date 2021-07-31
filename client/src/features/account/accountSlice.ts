import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from 'types';

const initialState = {
  accounts: [] as Account[],
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setAccounts: (state, { payload }: PayloadAction<Account[]>) => {
      state.accounts = payload;
    },
		addAccount: (state, { payload }: PayloadAction<Account>) => {
			state.accounts = [ ...state.accounts, payload ];
		},
		updateAccount: (state, {payload: { id, data }}: PayloadAction<{ id: number, data: Account }>) => {
			state.accounts = state.accounts.map(account => {
				if ( account.id === id ) return { ...account, ...data };
				return account;
			});
		},
		removeAccount: (state, { payload }: PayloadAction<number>) => {
			state.accounts = state.accounts.filter(account => account.id !== payload);
		}
  }
})

export const { setAccounts, addAccount, updateAccount, removeAccount } = modeSlice.actions

export default modeSlice.reducer;
