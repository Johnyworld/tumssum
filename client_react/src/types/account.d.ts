declare module 'types' {
  interface Account {
    id: number;
    title: string;
    account?: number;
    /** 타 뱅크로 전송 */
    to?: number;
    datetime: string;
    location?: string;
    memo?: string;
    user: number;
    month?: number;
    category_title?: string;
    category?: number;
    bank?: number;
    bank_title?: string;
    created_at: string;
    updated_at: string;
  }
}
