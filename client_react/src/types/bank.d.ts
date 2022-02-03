declare module 'types' {
  type BankTree = BankGroup[];

  interface BankGroup {
    id: number;
    title: string;
    user: number;
    items?: Bank[];
    created_at: string;
    updated_at: string;
  }

  interface Bank {
    id: number;
    title: string;
    user: number;
    memo?: string;
    balance?: number;
    group?: number;
    accounts?: Account[];
    created_at: string;
    updated_at: string;
  }
}
