'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('dark-mode', false);
  const [currency, setCurrency] = useLocalStorage('currency', 'usd');

   // New useEffect to handle initial theme application and localStorage updates
   useEffect(() => {
    // Check localStorage for preferred theme and apply it
    const storedTheme = localStorage.getItem('dark-mode');
    if (storedTheme === 'true') { // Use string 'true' for localStorage
      document.documentElement.classList.add('dark');
      setIsDarkMode(true); // Update state to reflect stored preference
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false); // Update state to reflect default or light preference
    }
  }, []); 


  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currency, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};