declare module 'types' {
  type BankTree = BankGroup[];

  interface BankGroup {
    id: number;
    title: string;
    user: number;
    items: Bank[];
    created_at: string;
    updated_at: string;
  }

  interface Bank {
    id: number;
    title: string;
    memo?: string;
    balance?: number;
    group: number | null;
    user: number;
    created_at: string;
    updated_at: string;
    accounts?: Account[];
  }
}
