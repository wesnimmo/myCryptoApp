'use client';

import { useTheme } from '@/context/ThemeContext';

export default function CoinSearchBar() {
  const { search, setSearch } = useTheme();

  return (
    <tr>
      <td colSpan={9} className="p-3 bg-[var(--background)] text-[var(--text)]">
        <input
          type="text"
          placeholder="Search coins…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
        />
      </td>
    </tr>
  );
}
