// components/coins/CoinRowsClient.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useCoinsInfinite } from '@/hooks/useCoinsInfinite';
import CoinRow from './CoinRow';
import CoinRowsSkeleton from './CoinRowSkeleton';

export default function CoinRowsClient() {
  const { currency } = useTheme();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useCoinsInfinite(currency);

  if (status === 'pending') {
    return <CoinRowsSkeleton rows={10} />;
  }

  
  if (status === "error") {
    return (
      <tr>
        <td colSpan={9} className="py-6 text-center text-red-500">
          Failed to load coins: {error?.message}
        </td>
      </tr>
    );
  }

  const coins = data?.pages.flat() ?? [];
  
  // console.log('here is the data-->', data)
  // console.log('...and the data.pages-->', data?.pages)
  // console.log('...AND finally the coins---->', coins)

  return (
    <>
    
      {coins?.map((c) => (
        <CoinRow key={c.id} coin={c} currency={currency} />
      ))}

       {/* Load more row */}
      <tr>
        <td colSpan={9} className="py-4">
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-4 py-2 rounded bg-gray-900 text-white disabled:opacity-50"
            >
              {isFetchingNextPage
                ? "Loading…"
                : hasNextPage
                ? "Load more"
                : "No more results"}
            </button>
          </div>
        </td>
      </tr>

    </>
  );
}
