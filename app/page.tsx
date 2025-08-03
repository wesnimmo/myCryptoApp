// app/page.tsx
'use client';

import { useTheme } from '../context/ThemeContext';
import { useCoins } from '../hooks/useCoins';

export default function Home() {
  const { currency } = useTheme();
  const { data: coins, isLoading, isError, error } = useCoins(currency, 1);

  return (
    <div className="min-h-screen">
      <main className="p-4 max-w-5xl mx-auto">
        {isLoading && <p className="text-[var(--text)]">Loading...</p>}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}
        <ul className="space-y-2">
          {coins?.map((coin) => (
            <li
              key={coin.id}
              className="p-2 bg-[var(--background)] text-[var(--text)] rounded shadow-sm"
            >
              {coin.name}: {coin.current_price} {currency.toUpperCase()}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}