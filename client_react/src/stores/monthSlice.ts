import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Month } from 'types';
import api from '~/utils/api';

export const getMonths = createAsyncThunk('months/getMonths', async (_, { rejectWithValue }) => {
  const { ok, message, data } = await api.months.getMonths();
  if (!ok) throw rejectWithValue(message);
  else return data;
});

const initialState = {
  months: [] as Month[],
  error: '',
  loaded: false,
};

export const monthSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMonths: (state, { payload }: PayloadAction<Month[]>) => {
      state.months = payload;
    },
    updateOrAddMonths: (state, { payload }: PayloadAction<Month[]>) => {
      const news: Month[] = [];
      for (const month of payload) {
        let isMatch = false;
        state.months = state.months.map(m => {
          if (m.id === month.id) {
            isMatch = true;
            return month;
          } else {
            return m;
          }
        });
        if (!isMatch) news.push(month);
      }
      state.months = [...state.months, ...news];
    },
  },

  extraReducers: builder => {
    builder.addCase(getMonths.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loaded = true;
    });
    builder.addCase(getMonths.fulfilled, (state, { payload }) => {
      state.months = payload;
      state.error = '';
      state.loaded = true;
    });
  },
});

export const { setMonths, updateOrAddMonths } = monthSlice.actions;

export default monthSlice.reducer;
