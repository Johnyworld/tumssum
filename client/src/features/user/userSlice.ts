import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'types';


const userInfo = localStorage.getItem('userInfo');


interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  loading: false,
  error: '',
}


export const login = createAsyncThunk('user/login', async ({ email, password }: any) => {
  const { data } = await axios.post('/api/login/', { username: email, password });
  return data;
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.error = '';
      state.loading = false;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    });
    builder.addCase(login.rejected, (state, { error }) => {
      state.error = error.message || '';
      state.loading = false;
    });
  },
});


export const { logout } = userSlice.actions;

export default userSlice.reducer;
