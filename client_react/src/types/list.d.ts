declare module 'types' {
  interface OptionItem {
    id: string;
    text: string;
  }

  interface DropdownOption {
    id: string | number;
    text: string | number;
    children?: DropdownOption[];
  }

  interface MenuItem extends OptionItem {
    href?: string;
  }
}
