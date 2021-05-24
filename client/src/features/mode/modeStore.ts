import { useCallback, useState } from "preact/hooks";


type Theme = 'light' | 'dark';

export interface ModeStore {
  theme: Theme;
  handleChangeTheme: () => void;
}

const getSystemTheme: () => Theme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

const localTheme = localStorage.getItem('theme') as Theme | null;
const defaultTheme = localTheme || getSystemTheme();
document.documentElement.setAttribute("data-theme", defaultTheme);


export default () => {

  const [theme, setTheme] = useState(defaultTheme);

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  return {
    theme,
    handleChangeTheme
  }
}
