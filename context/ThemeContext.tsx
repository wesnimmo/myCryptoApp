'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCurrency = searchParams.get("currency");

  const [isDarkMode, setIsDarkMode] = useLocalStorage('dark-mode', false);
  const [currencyLS, setCurrencyLS] = useLocalStorage('currency', 'usd');

  const activeCurrency = (urlCurrency || currencyLS || 'usd').toLowerCase();


  // 1. Wrap in useCallback to stabilize the function identity
  const setCurrency = useCallback((next: string) => {
    const normalized = next.toLowerCase();
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("currency", normalized);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]); // Dependencies for the function itself

  // 2. Now it's safe to include in the useEffect
  useEffect(() => {
    if (urlCurrency) {
      setCurrencyLS(urlCurrency.toLowerCase());
    } 
    else if (currencyLS && !urlCurrency) {
      setCurrency(currencyLS); 
    }
  }, [urlCurrency, currencyLS, setCurrencyLS, setCurrency]); // Added setCurrency here

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const [search, setSearch] = useState("");

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        currency: activeCurrency,
        setCurrency,
        search,
        setSearch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
