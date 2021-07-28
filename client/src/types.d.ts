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

}