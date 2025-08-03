// components/Header.tsx
'use client';

import { FiSun, FiMoon } from "react-icons/fi";

import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme, currency, setCurrency } = useTheme();
  const currencies = ['usd', 'aud', 'gbp', 'eur'];

  return (
    <header className="flex justify-between items-center p-4 bg-[var(--background)] text-[var(--text)] dark:bg-[var(--color-background-dark)] shadow-md">
      <h1 className="text-2xl font-bold">Crypto App</h1>
      <div className="flex items-center space-x-4">
        <select
          data-testid="currency-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 bg-gray-700 rounded text-[var(--text)] dark:bg-gray-800"
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          data-testid="theme-toggle"
          onClick={toggleTheme}
          className="p-2 bg-[var(--color-primary)] rounded dark:bg-[var(--color-primary-dark)] shadow-sm"
        >
          {isDarkMode ? <FiSun data-testid="sun-icon"/> : <FiMoon/>}
        </button>
      </div>
    </header>
  );
}