import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Account } from 'types';
import api from '~/utils/api';


export const getAccounts = createAsyncThunk('account/getAccounts', async (_, { rejectWithValue }) => {
	try { return await api.accounts.getList() }
	catch (err) { throw rejectWithValue(err) }
});


const initialState = {
  accounts: [] as Account[],
	error: '',
	loaded: false,
}

export const accountSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setAccounts: (state, { payload }: PayloadAction<Account[]>) => {
      state.accounts = payload;
    },
		addAccount: (state, { payload }: PayloadAction<Account>) => {
			state.accounts = [ ...state.accounts, payload ];
		},
		addAccounts: (state, { payload }: PayloadAction<Account[]>) => {
			state.accounts = [ ...state.accounts, ...payload ];
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
  },
	extraReducers: builder => {
		builder.addCase(getAccounts.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loaded = true;
		});
		builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
			state.error = payload.code;
			state.accounts = payload.data;
			state.loaded = true;
		});
	}
})

export const { setAccounts, addAccount, addAccounts, updateAccount, removeAccount } = accountSlice.actions

export default accountSlice.reducer;
