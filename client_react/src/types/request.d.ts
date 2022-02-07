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
}
