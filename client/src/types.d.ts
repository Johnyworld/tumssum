declare module 'types' {
  import { icons } from "~components/elements/Icon/Icon";

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
    gray_strong: string,
    gray: string,
    gray_weak: string,
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

}