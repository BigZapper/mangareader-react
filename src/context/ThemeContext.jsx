import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('thememode');
    return saved !== 'lightmode';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('lightmode');
      localStorage.setItem('thememode', 'darkmode');
    } else {
      document.body.classList.add('lightmode');
      localStorage.setItem('thememode', 'lightmode');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
