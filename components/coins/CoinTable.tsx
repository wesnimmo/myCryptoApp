import { Suspense } from "react";
import CoinRowsClient from "./CoinRowsClient";
import CoinRowSkeleton from "./CoinRowSkeleton";

// interface Props { coins: Coin[]; }

export default function CoinsTable() {
 

  // if (!coins?.length) return <div>No coins found</div>;

  return (
    <table className="w-full table-fixed border-separate border-spacing-0 bg-[var(--background)] rounded-lg shadow-lg overflow-hidden text-sm">
      <colgroup>
        <col className="w-12" />
        <col className="w-64" />
        <col className="w-28" />
        <col className="w-20" />
        <col className="w-20" />
        <col className="w-32" />
        <col className="w-28" />
        <col className="w-36" />
        <col className="w-28" />
      </colgroup>
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700 sticky top-0 bg-inherit z-10">Rank</th>
          <th scope="col" className="text-left py-4 px-20 font-semibold text-gray-700">Name / Symbol</th>
          <th scope="col" className="text-left py-4 font-semibold text-gray-700">Price</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">1h %</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">24h %</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">Market Cap</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">Volume</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">Vol / Mkt Cap</th>
          <th scope="col" className="text-center py-4 px-2 font-semibold text-gray-700">Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
       <Suspense fallback={<CoinRowSkeleton rows={10} />}>
        <CoinRowsClient/>
       </Suspense>
      </tbody>
    </table>
  );
}
