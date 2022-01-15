import { ChromaticColor, Color, MenuItem, ThreeSize } from "types";

export const chromaticColors: ChromaticColor[] = [
	'primary',
	'red',
	'green',
	'paper',
];

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

export const buttonTypes: ('button' | 'submit')[] = [
	'button',
	'submit',
]

export const threeSizes: ThreeSize[] = [
	'small',
	'regular',
	'large',
]

export const strokeWidths = [
	'thin',
	'normal',
	'bold',
	'heavy'
] as const;

export const tooLongText2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in sollicitudin augue, congue aliquam elit. In vestibulum lorem eget nibh hendrerit hendrerit. Sed eu sapien et nibh bibendum consectetur accumsan at sapien. Quisque vestibulum neque vel iaculis tempor.';
export const tooLongText1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in sollicitudin augue, congue aliquam elit.';

export type FixtureNavigationMenu = 'home' | 'profile' | 'settings';
export const navigationMenu = [
	{ id: 'home', text: 'Home' },
	{ id: 'profile', text: 'Profile' },
	{ id: 'settings', text: 'Settings' },
] as MenuItem<FixtureNavigationMenu>[];


export type FixtureALotOfNavigationMenu = FixtureNavigationMenu | 'long-1' | 'long-2' | 'long-3' | 'long-4' | 'long-5' | 'long-6';
export const aLotOfNavigationMenu = [
	...navigationMenu,
	{ id: 'long-1', text: 'The long menu item A' },
	{ id: 'long-2', text: 'The long menu item B' },
	{ id: 'long-3', text: 'The long menu item C' },
	{ id: 'long-4', text: 'The long menu item D' },
	{ id: 'long-5', text: 'The long menu item E' },
	{ id: 'long-6', text: 'The long menu item F' },
] as MenuItem<FixtureALotOfNavigationMenu>[];
