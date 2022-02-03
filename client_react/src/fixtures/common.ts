import { ChromaticColor, Color, DropdownOption, MenuItem, ThreeSize } from 'types';

export const chromaticColors: ChromaticColor[] = ['primary', 'red', 'green', 'paper'];

export const allColors: Color[] = [
  ...chromaticColors,
  'gray_strong',
  'gray',
  'gray_weak',
  'gray_weaker',
  'bg',
  'white',
  'black',
  'pen',
  'pencel',
];

export const isoStringNow = new Date().toISOString();

export const buttonTypes: ('button' | 'submit')[] = ['button', 'submit'];

export const threeSizes: ThreeSize[] = ['small', 'regular', 'large'];

export const strokeWidths = ['thin', 'normal', 'bold', 'heavy'] as const;

export const tooLongText2 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in sollicitudin augue, congue aliquam elit. In vestibulum lorem eget nibh hendrerit hendrerit. Sed eu sapien et nibh bibendum consectetur accumsan at sapien. Quisque vestibulum neque vel iaculis tempor.';
export const tooLongText1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in sollicitudin augue, congue aliquam elit.';

export const navigationMenu: MenuItem[] = [
  { id: 'home', text: 'Home' },
  { id: 'profile', text: 'Profile' },
  { id: 'settings', text: 'Settings' },
];

export const aLotOfNavigationMenu: MenuItem[] = [
  ...navigationMenu,
  { id: 'long-1', text: 'The long menu item A' },
  { id: 'long-2', text: 'The long menu item B' },
  { id: 'long-3', text: 'The long menu item C' },
  { id: 'long-4', text: 'The long menu item D' },
  { id: 'long-5', text: 'The long menu item E' },
  { id: 'long-6', text: 'The long menu item F' },
];

export const selectList: DropdownOption[] = [
  { id: 'orange', text: 'Orange' },
  { id: 'apple', text: 'Apple' },
  { id: 'banana', text: 'Banana' },
  { id: 'grape', text: 'Grape' },
];

export const selectListGroups: DropdownOption[] = [
  {
    id: 'fruits',
    text: 'Fruits',
    children: [
      { id: 'orange', text: 'Orange' },
      { id: 'apple', text: 'Apple' },
      { id: 'banana', text: 'Banana' },
      { id: 'grape', text: 'Grape' },
    ],
  },
  {
    id: 'drinks',
    text: 'Drinks',
    children: [
      { id: 'water', text: 'Water' },
      { id: 'coffee', text: 'Coffee' },
      { id: 'coke', text: 'Coke' },
      { id: 'beer', text: 'Beer' },
    ],
  },
];

export const selectPlaceholder = 'Select something...';
