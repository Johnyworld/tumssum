import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryGroup } from 'types';

const initialState = {
  categories: [] as Category[],
  categoryGroups: [] as CategoryGroup[],
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setCategoryGroups: (state, { payload }: PayloadAction<CategoryGroup[]>) => {
      state.categoryGroups = payload;
    },
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(category => category.id !== payload.id ? category : {
        ...category,
        ...payload,
      });
    }
  }
})

export const { setCategories, setCategoryGroups, updateCategory } = modeSlice.actions

export default modeSlice.reducer;
