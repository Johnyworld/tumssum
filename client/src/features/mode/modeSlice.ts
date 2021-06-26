import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark'

const getSystemTheme: () => Theme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

const localTheme = localStorage.getItem('theme') as Theme | null;
const defaultTheme = localTheme || getSystemTheme();
document.documentElement.setAttribute("data-theme", defaultTheme);


const initialState = {
  theme: defaultTheme,
  fullLoading: false,
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      state.theme = newTheme;
    },
    changeFullLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.fullLoading = payload;
    }
  }
})

export const { changeTheme, changeFullLoading } = modeSlice.actions

export default modeSlice.reducer;
