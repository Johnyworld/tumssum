declare module 'types' {
  export interface User {
    name: string
  }

  export interface Colors {
    white: string;
    black: string;
    pen: string;
    paper: string;
    bg: string;
    primary: string;
  }

  export type Color = keyof Colors;
}