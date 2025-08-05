// components/Header.tsx
'use client';

import { FiSun, FiMoon } from "react-icons/fi";

import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme, currency, setCurrency } = useTheme();
  const currencies = ['usd', 'aud', 'gbp', 'eur'];

  return (
    <header className="mb-8 w-full bg-[var(--background)] text-[var(--text)] dark:bg-[var(--color-background-dark)] shadow-md">
    <div className="flex justify-between items-center max-w-[1140px] mx-auto p-4">
      <h1 className="text-2xl font-bold">Crypto App</h1>
      <button
        data-testid="theme-toggle"
        onClick={toggleTheme}
        className="p-2 rounded shadow-sm"
      >
        {isDarkMode ? <FiSun data-testid="sun-icon" /> : <FiMoon />}
      </button>
      <select
        data-testid="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 rounded text-[var(--text)]"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  </header>
  );
}