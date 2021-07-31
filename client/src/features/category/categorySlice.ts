import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryGroup } from 'types';

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
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(group => group.id !== payload.group ? group : {
        ...group,
        categories: group.categories.map(category => category.id !== payload.id ? category : {
          ...category,
          ...payload,
        })
      });
    }
  }
})

export const { setCategories, updateCategory } = modeSlice.actions

export default modeSlice.reducer;
