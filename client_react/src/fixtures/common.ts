import { ChromaticColor, Color, ThreeSize } from "types";

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

