declare module 'types' {
  interface OptionItem {
    id: string;
    text: string;
  }

  interface MenuItem extends OptionItem {
    href?: string;
  }

  interface IconMenuItemType extends OptionItem {
    icon: IconType;
    href?: string;
  }

  interface DropdownOption {
    id: string | number;
    text: string | number;
    children?: DropdownOption[];
  }
}
