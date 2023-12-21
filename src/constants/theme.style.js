import React, { createContext, useContext, useState } from 'react';

const LightTheme = {
  PRIMARY_COLOR: '#cfcfcf',
  SECONDARY_COLOR: '#FFFFFF',
  ACCENT_COLOR: '#000000',
  HIGHLIGHT_COLOR: '#9370DB',
  TEXT_COLOR: '#000000',
  BORDER_COLOR: 'black',
  BUTTON_COLOR: '#9370DB',
  SEARCHICON_COLOR: '#000',
  LIST_BG_COLOR: 'white',
  TAB_BAR_COLOR: 'white',
};

const DarkTheme = {
  PRIMARY_COLOR: '#343536',
  SECONDARY_COLOR: '#555555',
  ACCENT_COLOR: '#FFFFFF',
  HIGHLIGHT_COLOR: '#9370DB',
  TEXT_COLOR: '#FFFFFF',
  BORDER_COLOR: 'white',
  BUTTON_COLOR: '#9370DB',
  SEARCHICON_COLOR: 'white',
  LIST_BG_COLOR: '#47484a',
  TAB_BAR_COLOR: '#47484a'
};

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === LightTheme ? DarkTheme : LightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};