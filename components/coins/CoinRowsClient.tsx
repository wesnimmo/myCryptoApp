'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useCoinsInfinite } from '@/hooks/useCoinsInfinite';
import CoinRow from './CoinRow';
import CoinRowsSkeleton from './CoinRowSkeleton';

export default function CoinRowsClient() {
  const { currency } = useTheme();

  // 🔹 User input
  const [search, setSearch] = useState("");

  // 🔹 Debounce search value to avoid spam-fetching
  const debouncedSearch = useDebouncedValue(search, 300);

  // 🔹 Unified infinite query (handles both search + normal)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useCoinsInfinite(currency, debouncedSearch); // Pass in search term

  // 🔹 Skeleton while loading
  if (status === 'pending') {
    return (
      <>
        {/* Search bar always visible */}
        <SearchBar search={search} setSearch={setSearch} />
        <CoinRowsSkeleton rows={10} />
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <SearchBar search={search} setSearch={setSearch} />
        <tr>
          <td colSpan={9} className="py-6 text-center text-red-500">
            Failed to load coins: {error?.message}
          </td>
        </tr>
      </>
    );
  }

  // Flatten infinite pages
  const coins = data?.pages.flat() ?? [];

  return (
    <>
      {/* 🔍 Search input */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* List rows */}
      {coins.map((c) => (
        <CoinRow key={c.id} coin={c} currency={currency} />
      ))}

      {/* Load more button */}
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

/** 🔍 Extracted tiny SearchBar component */
function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <tr>
      <td colSpan={9} className="p-3 bg-gray-100 dark:bg-gray-800">
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
