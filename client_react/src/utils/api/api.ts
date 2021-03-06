import {
  Account,
  Bank,
  BankGroup,
  Budget,
  Category,
  CategoryGroup,
  Month,
  ReqCreateAccount,
  ReqCreateBank,
  ReqCreateBankGroup,
  ReqCreateCategory,
  ReqCreateCategoryGroup,
  ReqDeleteAccount,
  ReqDeleteBank,
  ReqDeleteBankGroup,
  ReqDeleteCategory,
  ReqDeleteCategoryGroup,
  ReqUpdateAccount,
  ReqUpdateBank,
  ReqUpdateBankGroup,
  ReqUpdateCategory,
  ReqUpdateCategoryGroup,
} from 'types';
import request from './request';

/**
 * 모든 API 요청을 여기서 관리합니다.
 * RTK thunk 에서 요청하는 API도 여기를 통해야 합니다.
 * 어떤 parameter를 받고 어떤 값을 return 받는지 한 눈에 파악할 수 있습니다.
 * 성공적으로 API response를 받았을 때 data에 포함되는 타입은 await request<Here> 에 지정합니다.
 */
const api = {
  auth: {
    sendEmail: async (email: string) => await request<null>('GET', '/api/login/send/', { email }),
    register: async (name: string, email: string) => await request<null>('POST', '/api/register/', { name, email }),
  },

  accounts: {
    getList: async () => await request<Account[]>('GET', '/api/accounts/', {}),
    createAccount: async (body: ReqCreateAccount) =>
      await request<{ account: Account; months: Month[] }>('POST', '/api/account/', body),
    updateAccount: async (body: ReqUpdateAccount) =>
      await request<{ account: Account; months: Month[] }>('PUT', '/api/account/', body),
    patchAccount: async (body: ReqUpdateAccount) =>
      await request<{ account: Account; months: Month[] }>('PATCH', '/api/account/', body),
    deleteAccount: async (body: ReqDeleteAccount) =>
      await request<{ account: number; months: Month[] }>('DELETE', '/api/account/', body),
  },

  banks: {
    getBanks: async () => await request<{ banks: Bank[]; groups: BankGroup[] }>('GET', '/api/banks/', {}),
    createBankGroup: async (body: ReqCreateBankGroup) => await request<BankGroup>('POST', '/api/bank-group/', body),
    updateBankGroup: async (body: ReqUpdateBankGroup) => await request<BankGroup>('PUT', '/api/bank-group/', body),
    deleteBankGroup: async (body: ReqDeleteBankGroup) =>
      await request<{ id: number; items: Bank[] }>('DELETE', '/api/bank-group/', body),
    createBank: async (body: ReqCreateBank) => await request<Bank>('POST', '/api/bank/', body),
    updateBank: async (body: ReqUpdateBank) => await request<Bank>('PUT', '/api/bank/', body),
    deleteBank: async (body: ReqDeleteBank) => await request<number>('DELETE', '/api/bank/', body),
  },

  categories: {
    getCategories: async () =>
      await request<{ categories: Category[]; groups: CategoryGroup[] }>('GET', '/api/categories/', {}),
    createCategoryGroup: async (body: ReqCreateCategoryGroup) =>
      await request<CategoryGroup>('POST', '/api/category-group/', body),
    updateCategoryGroup: async (body: ReqUpdateCategoryGroup) =>
      await request<CategoryGroup>('PUT', '/api/category-group/', body),
    deleteCategoryGroup: async (body: ReqDeleteCategoryGroup) =>
      await request<{ id: number; items: Category[] }>('DELETE', '/api/category-group/', body),
    createCategory: async (body: ReqCreateCategory) =>
      await request<{ category: Category; budget: Budget | number }>('POST', '/api/category/', body),
    updateCategory: async (body: ReqUpdateCategory) =>
      await request<{ category: Category; budget: Budget | number }>('PUT', '/api/category/', body),
    deleteCategory: async (body: ReqDeleteCategory) => await request<number>('DELETE', '/api/category/', body),
  },

  budgets: {
    getBudgets: async () => await request<Budget[]>('GET', '/api/budgets/', {}),
  },

  months: {
    getMonths: async () => await request<Month[]>('GET', '/api/months/', {}),
  },
};

export default api;
