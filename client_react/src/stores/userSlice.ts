import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types';
import CustomLocalStorage from '~/utils/CustomLocalStorage';

const customLocalStorage = new CustomLocalStorage();

interface UserState {
  userInfo: User | null;
}

const initialState: UserState = {
  userInfo: customLocalStorage.getUserInfo(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.userInfo = payload;
      customLocalStorage.setUserInfo(payload);
    },
    updateUser: (state, { payload }: PayloadAction<User>) => {
      const userData = { ...state.userInfo, ...payload };
      state.userInfo = userData;
      customLocalStorage.setUserInfo(userData);
    },
    logout: state => {
      state.userInfo = null;
      customLocalStorage.removeUserInfo();
    },
  },
});

export const { setUser, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
