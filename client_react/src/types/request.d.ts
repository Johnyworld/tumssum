declare module 'types' {
  interface ReqCreateBankGroup {
    title: string;
  }
  interface ReqUpdateBankGroup extends ReqCreateBankGroup {
    bank_group_id: number;
  }
  interface ReqDeleteBankGroup {
    bank_group_id: number;
  }

  interface ReqCreateBank {
    title: string;
    memo?: string;
    group_id?: number;
  }
  interface ReqUpdateBank extends ReqCreateBank {
    bank_id: number;
  }
  interface ReqDeleteBank {
    bank_id: number;
  }

  interface ReqCreateCategoryGroup {
    title: string;
  }
  interface ReqUpdateCategoryGroup extends ReqCreateCategoryGroup {
    category_group_id: number;
  }
  interface ReqDeleteCategoryGroup {
    category_group_id: number;
  }

  interface ReqCreateCategory {
    title: string;
    memo?: string;
    budget?: number;
    category_group_id?: number;
    yyyymm: string;
  }
  interface ReqUpdateCategory extends ReqCreateCategory {
    category_id: number;
  }
  interface ReqDeleteCategory {
    category_id: number;
  }
}
