import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'types';


const userInfo = localStorage.getItem('userInfo');


interface UserState {
  userInfo: User | null;
  sent: boolean;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  sent: false,
  loading: false,
  error: '',
}


export const sendEmail = createAsyncThunk('user/sendEmail', async ({ email }: any) => {
  const res = await axios.get(`/api/login/send?email=${email}`);
  if ( res.status === 200 ) return res.data;
  if ( res.status === 204 ) throw 'error_user_does_not_exists';
  else throw res.status
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    socialLogin: (state, { payload }:PayloadAction<User>) => {
      state.userInfo = payload; 
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
    set: (state, {payload}: PayloadAction<User>) => {
      state.userInfo = payload; 
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendEmail.fulfilled, (state, { payload }) => {
      state.sent = true;
      state.loading = false;
    });
    builder.addCase(sendEmail.rejected, (state, { error }) => {
      state.error = error.message || '';
      state.loading = false;
    });
  },
});


export const { socialLogin, set, logout } = userSlice.actions;

export default userSlice.reducer;
