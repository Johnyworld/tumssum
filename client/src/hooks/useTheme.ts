import { Colors, Color } from 'types';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from '~utils/redux/hooks';


const getThemeColors = (colors: Color[]) => {
  const computed = getComputedStyle(document.documentElement);
  return colors.reduce((prev, curr) => {
    return { ...prev, [curr]: computed.getPropertyValue(`--color-${curr}`) }
  }, {} as Colors);
}

const useThemeColors = (colors: Color[]) => {
  const theme = useSelector(state => state.mode.theme);
  const [themeColors, setThemeColors] = useState<Colors>(getThemeColors(colors));

  useEffect(() => {
    const newThemeColors: Colors = getThemeColors(colors)
    setThemeColors(newThemeColors);
  }, [theme]);

  return themeColors;
}

export default useThemeColors;