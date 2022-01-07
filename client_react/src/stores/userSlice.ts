import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types';


const userInfo = localStorage.getItem('userInfo');


interface UserState {
  userInfo: User | null;
}


const initialState: UserState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<User>) => {
      state.userInfo = payload; 
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
    updateUser: (state, {payload}: PayloadAction<User>) => {
      const userData = {...state.userInfo, ...payload};
      state.userInfo = userData;
      localStorage.setItem('userInfo', JSON.stringify(userData));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
});


export const { setUser, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
