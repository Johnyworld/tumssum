declare module 'types' {
  export interface User {
    name: string
  }

  export interface Colors {
    pen: string;
    paper: string;
    bg: string;
    primary: string;
  }

  export type Color = keyof Colors;
}