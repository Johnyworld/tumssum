import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryGroup } from 'types';

const initialState = {
  categories: [] as Category[],
  categoryGroups: [] as CategoryGroup[],
}

export const categorySlice = createSlice({
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
    addCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = [...state.categories, ...payload];
    },
    addCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = [...state.categories, payload];
    },
    updateCategoryGroup: (state, { payload }: PayloadAction<CategoryGroup>) => {
      state.categoryGroups = state.categoryGroups.map(group => group.id !== payload.id ? group : {
        ...group,
        ...payload,
      });
    },
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(category => category.id !== payload.id ? category : {
        ...category,
        ...payload,
      });
    },
    removeCategoryGroup: (state, { payload }: PayloadAction<number>) => {
      state.categoryGroups = state.categoryGroups.filter(group => group.id !== payload);
    },
    removeCategory: (state, { payload }: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== payload);
    },
  }
})

export const { setCategories, setCategoryGroups, addCategoryGroup, addCategories, addCategory, updateCategoryGroup, updateCategory, removeCategoryGroup, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
