declare module 'types' {

	interface ChromaticColors {
    primary: string;
    red: string;
    green: string;
  }

	interface AchromaticColors {
    gray_strong: string,
    gray: string,
    gray_weak: string,
    gray_weaker: string,
    bg: string;
    white: string;
    black: string;
    pen: string;
    pencel: string;
    paper: string;
	}

  type ChromaticColor = keyof ChromaticColors;
  type AchromaticColor = keyof AchromaticColors;
  type Color = ChromaticColor | AchromaticColor;
	
}