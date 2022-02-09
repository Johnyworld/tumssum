import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryGroup } from 'types';
import api from '~/utils/api';

export const getCategories = createAsyncThunk('categories/getCategories', async (_, { rejectWithValue }) => {
  const { ok, message, data } = await api.categories.getCategories();
  if (!ok) throw rejectWithValue(message);
  else return data;
});

const initialState = {
  categories: [] as Category[],
  categoryGroups: [] as CategoryGroup[],
  error: '',
  loaded: false,
};

export const categorySlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setIsLoaded: state => {
      state.loaded = true;
    },
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
      state.categoryGroups = state.categoryGroups.map(group =>
        group.id !== payload.id
          ? group
          : {
              ...group,
              ...payload,
            }
      );
    },
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(category =>
        category.id !== payload.id
          ? category
          : {
              ...category,
              ...payload,
            }
      );
    },
    removeCategoryGroup: (state, { payload }: PayloadAction<number>) => {
      state.categoryGroups = state.categoryGroups.filter(group => group.id !== payload);
    },
    removeCategory: (state, { payload }: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loaded = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.error = '';
      state.categories = payload.categories;
      state.categoryGroups = payload.groups;
      state.loaded = true;
    });
  },
});

export const {
  setIsLoaded,
  setCategories,
  setCategoryGroups,
  addCategoryGroup,
  addCategories,
  addCategory,
  updateCategoryGroup,
  updateCategory,
  removeCategoryGroup,
  removeCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
