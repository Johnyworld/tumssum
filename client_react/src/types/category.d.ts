declare module 'types' {
  interface Category {
    id: number;
    title: string;
    memo: string;
    group: number | null;
    user: number;
    budget?: number;
    created_at: string;
    updated_at: string;
    accounts: Account[];
  }
}
