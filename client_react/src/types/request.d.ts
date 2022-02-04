declare module 'types' {
  interface ReqCreateBankGroup {
    title: string;
  }
  interface ReqCreateBank {
    title: string;
    group_id?: number;
  }
}
