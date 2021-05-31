import { Color } from 'types';

export const getThemeColor = (color: Color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${color}`);
}
