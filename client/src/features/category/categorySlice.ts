import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryGroup } from 'types';

const initialState = {
  categories: [] as CategoryGroup[],
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<CategoryGroup[]>) => {
      state.categories = payload;
    },
  }
})

export const { setCategories } = modeSlice.actions

export default modeSlice.reducer;
