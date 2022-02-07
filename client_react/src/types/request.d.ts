declare module 'types' {
  interface ReqCreateBankGroup {
    title: string;
  }
  interface ReqCreateBank {
    title: string;
    memo?: string;
    group_id?: number;
  }
  interface ReqUpdateBank extends ReqCreateBank {
    bank_id: number;
  }
}
