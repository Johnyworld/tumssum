import { Colors, Color } from 'types';
import { useSelector } from '~utils/redux/hooks';


const getThemeColors = (colors: Color[]) => {
  const computed = getComputedStyle(document.documentElement);
  return colors.reduce((prev, curr) => {
    return { ...prev, [curr]: computed.getPropertyValue(`--color-${curr}`) }
  }, {} as Colors);
}

const useThemeColors = (colors: Color[]) => {
  useSelector(state => state.mode.theme);
  return getThemeColors(colors);
}

export default useThemeColors;