import { Size, Weight } from "types";

export const TITLE_MAX_LENGTH = 40;
export const ACCOUNT_MAX = 999999999999;

export const WEIGHTS_ARRAY = ['thin', 'normal', 'bold'] as Weight[];
export const SIZES_ARRAY = ['tiny', 'small', 'regular', 'medium', 'large', 'big', 'huge'] as Size[];

export const PX_RATIO = window.devicePixelRatio > 1 ? 2 : 1;
export const SIDE_WIDTH_MAX = 800;
export const SIDE_WIDTH_DEFAULT = 350;
export const SIDE_WIDTH_MIN = 320;
