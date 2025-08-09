import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'light';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to detect system preference
  const getSystemPreference = useCallback((): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Function to apply theme
  const applyTheme = useCallback((mode: ThemeMode) => {
    let shouldBeDark = false;
    
    switch (mode) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'auto':
        shouldBeDark = getSystemPreference();
        break;
    }

    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [getSystemPreference]);

  // Set theme mode and persist to localStorage
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
    applyTheme(mode);
  }, [applyTheme]);

  // Initial theme application
  useEffect(() => {
    applyTheme(themeMode);
  }, [applyTheme, themeMode]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('auto');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode, applyTheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, isDarkMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 