import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bank, BankGroup } from 'types';

const initialState = {
  banks: [] as Bank[],
  bankGroups: [] as BankGroup[],
};

export const bankSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setBanks: (state, { payload }: PayloadAction<Bank[]>) => {
      state.banks = payload;
    },
    setBankGroups: (state, { payload }: PayloadAction<BankGroup[]>) => {
      state.bankGroups = payload;
    },
    addBankGroup: (state, { payload }: PayloadAction<BankGroup>) => {
      state.bankGroups = [...state.bankGroups, payload];
    },
    addBanks: (state, { payload }: PayloadAction<Bank[]>) => {
      state.banks = [...state.banks, ...payload];
    },
    addBank: (state, { payload }: PayloadAction<Bank>) => {
      state.banks = [...state.banks, payload];
    },
    updateBankGroup: (state, { payload }: PayloadAction<BankGroup>) => {
      state.bankGroups = state.bankGroups.map((group) =>
        group.id !== payload.id
          ? group
          : {
              ...group,
              ...payload,
            }
      );
    },
    updateBank: (state, { payload }: PayloadAction<Bank>) => {
      state.banks = state.banks.map((bank) =>
        bank.id !== payload.id
          ? bank
          : {
              ...bank,
              ...payload,
            }
      );
    },
    removeBankGroup: (state, { payload }: PayloadAction<number>) => {
      state.bankGroups = state.bankGroups.filter((group) => group.id !== payload);
    },
    removeBank: (state, { payload }: PayloadAction<number>) => {
      state.banks = state.banks.filter((bank) => bank.id !== payload);
    },
  },
});

export const {
  setBanks,
  setBankGroups,
  addBankGroup,
  addBanks,
  addBank,
  updateBankGroup,
  updateBank,
  removeBankGroup,
  removeBank,
} = bankSlice.actions;

export default bankSlice.reducer;
