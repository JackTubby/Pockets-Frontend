import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('saga-blue');

  const switchTheme = (newTheme) => {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
      const newHref = `${window.location.origin}/public/${newTheme}/theme.css`;
      themeLink.setAttribute('href', newHref);
      setTheme(newTheme);
      console.log('Theme changed to:', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
