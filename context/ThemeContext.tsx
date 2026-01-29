'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

  // Optional: persist URL currency to localStorage so refresh/new visit matches
  useEffect(() => {
    if (urlCurrency && urlCurrency.toLowerCase() !== currencyLS) {
      setCurrencyLS(urlCurrency.toLowerCase());
    }
  }, [urlCurrency, currencyLS, setCurrencyLS]);

  const setCurrency = (next: string) => {
    const normalized = next.toLowerCase();
    setCurrencyLS(normalized);

    const sp = new URLSearchParams(searchParams.toString());
    sp.set("currency", normalized);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

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
