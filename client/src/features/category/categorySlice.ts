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
    addCategoryGroup: (state, { payload }: PayloadAction<CategoryGroup>) => {
      state.categoryGroups = [...state.categoryGroups, payload];
    },
    addCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = [...state.categories, payload];
    },
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(category => category.id !== payload.id ? category : {
        ...category,
        ...payload,
      });
    },
    removeCategory: (state, { payload }: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== payload);
    },
  }
})

export const { setCategories, setCategoryGroups, addCategoryGroup, addCategory, updateCategory, removeCategory } = modeSlice.actions;

export default modeSlice.reducer;
