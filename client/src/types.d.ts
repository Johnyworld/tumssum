declare module 'types' {
  import { icons } from "~components/elements/Icon/Icon";

  export interface Vec2 {
    x: number,
    y: number
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    is_admin: string;
    refresh: string;
    access: string;
  }

  export interface Colors {
    white: string;
    black: string;
    pen: string;
    pencel: string;
    paper: string;
    bg: string;
    primary: string;
    red: string;
    gray_strong: string,
    gray: string,
    gray_weak: string,
    gray_weaker: string,
  }

  export interface DefaultProps {
    class?: string;
    style?: h.JSX.CSSProperties;
  }

  export type Color = keyof Colors;

  export type Size = 'tiny' | 'small' | 'regular' | 'medium' | 'large' | 'big' | 'huge';

  export type Weight = 'thin' | 'normal' | 'bold';

  export type IconType = typeof icons[number];

  export interface SelectMenuItem {
    id: string;
    text: string;
  }


  export interface Account {
    id: number;
    title: string;
    account: number;
    datetime: string;
    location: string;
    memo: string;
    user: number;
    month: number;
    category_title: string;
    category: number;
    bank: number;
    bank_title: string;
    created_at: string;
    updated_at: string;
  }

  export interface Category {
    id: number;
    title: string;
    group: number | null;
    user: number;
    created_at: string;
    updated_at: string;
    accounts: Account[];
  }

  export interface CategoryGroup {
    id: number;
    title: string;
    user: number;
    items: Category[];
    created_at: string;
    updated_at: string;
  }

  export interface Bank {
    id: number;
    title: string;
    balance: number;
    group: number | null;
    user: number;
    created_at: string;
    updated_at: string;
    accounts: Account[];
  }

  export interface BankGroup {
    id: number;
    title: string;
    user: number;
    items: Bank[];
    created_at: string;
    updated_at: string;
  }

  export interface Month {
    id: number;
    date: string;
    balance: number;
    user: number;
    bank: number;
    created_at: string;
    updated_at: string;
  }
}
