declare module 'types' {
  type CategoryTree = CategoryGroup[];

  interface CategoryGroup {
    id: number;
    title: string;
    user: number;
    items?: Category[];
    budget?: number;
    created_at: string;
    updated_at: string;
  }

  interface Category {
    id: number;
    title: string;
    memo?: string;
    group?: number;
    user: number;
    budget?: number;
    created_at: string;
    updated_at: string;
    accounts: Account[];
  }
}
