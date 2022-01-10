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
