declare module 'types' {
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
    paper: string;
    bg: string;
    primary: string;
    gray_strong: string,
    gray: string,
    gray_weak: string,
  }


  export type Color = keyof Colors;
  export type Size = 'tiny' | 'small' | 'regular' | 'medium' | 'large' | 'big' | 'huge';
}