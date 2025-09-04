// app/page.tsx
'use client';

import CoinsList from '@/components/CoinsList';
import { useTheme } from '../context/ThemeContext';
import { useCoins } from '../hooks/useCoins';

export default function Home() {
  const { currency } = useTheme();
  const { data: coins, isLoading, isError, error } = useCoins(currency, 1);

  console.log('Coins data-->', coins)

  return (
    <div className="min-h-screen">
      <main>
        {isLoading && <p className="text-[var(--text)]">Loading...</p>}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}
        {coins && <CoinsList coins={coins}/> }
      </main>
    </div>
  );
}