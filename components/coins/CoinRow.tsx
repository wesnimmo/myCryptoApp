// components/ListItem.tsx
import React from "react";
import { InformationCircleIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatCurrencyCompact } from "@/utils/format/currency";
import { Coin } from "@/lib/types";


interface CoinRowProps {
  coin: Coin;
  currency: string
}

export default function CoinRow({ coin, currency }: CoinRowProps) {

    // Calculate the ratio and handle the edge case where market_cap is zero.
    // This prevents division-by-zero and gives a predictable value.
    const volumeMarketCapRatio = coin.market_cap > 0 ? coin.total_volume / coin.market_cap : 0;

    // Convert the ratio to a percentage, capped at 100%.
    const volumePercentage = Math.min(volumeMarketCapRatio * 100, 100);

    // Round the percentage for the accessibility attribute.
    const ariaValue = Math.round(volumePercentage);


    // Helper for green/red styling
    const getChangeClass = (val: number) =>
        val > 0 ? "text-green-600" : val < 0 ? "text-red-500" : "text-gray-500";

    const v1h  = coin.price_change_percentage_1h_in_currency ?? coin.price_change_percentage_1h_in_currency ?? 0;
    const v24h = coin.price_change_percentage_24h ?? coin.price_change_percentage_24h ?? 0;

    const color1h  = getChangeClass(v1h);
    const color24h = getChangeClass(v24h);

    // Tooltip (simple, accessible)
    const tooltipId = `vol-mkt-tooltip-${coin.id}`;

  function ChangeIcon({ v }: { v: number }) {
    //console.log("ChangeIcon value:", v);
    if (v > 0) return <ChevronUpIcon className="w-4 h-4 text-emerald-500" aria-hidden />;
    if (v < 0) return <ChevronDownIcon className="w-4 h-4 text-rose-500" aria-hidden />;
    return <span className="inline-block w-4 h-4" aria-hidden />;
  }

      

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition group shadow-sm">
      {/* Rank */}
      <td className="text-center font-bold text-gray-500 w-8">{coin.market_cap_rank}</td>

      {/* Name / Symbol / Image */}
      <td className="px-20 py-3 align-middle min-w-[180px]">
        <div className="flex items-center text-center gap-2">
            {/* Reserve fixed space for the image */}
            <div className="w-8 flex-shrink-0 flex justify-center">
                <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    className="w-6 h-6 rounded-full border"
                />
            </div>
                {/* Text block */}
            <div className="flex flex-col">
                <span className="font-semibold">{coin.name}</span>
                <span className="text-xs text-left uppercase text-gray-400">{coin.symbol}</span>
            </div>
        </div>
      </td>


      {/* Price */}
      <td className="text-left font-mono">{coin.current_price != null ? formatCurrency(coin.current_price, currency) : '—'}</td>

      {/* 1h % Change */}
      <td className="px-2 py-3 text-center font-medium">
        <div className="flex items-center justify-center gap-1">
          <ChangeIcon v={v1h} />
          <span className={color1h}>
            {Math.abs(coin.price_change_percentage_1h_in_currency ?? 0).toFixed(2)}%
          </span>
        </div>
      </td>

      
      <td className="px-2 py-3 text-center font-medium">
        <div className="flex items-center justify-center gap-1">
           <ChangeIcon v={v24h} />
          <span className={color24h}>
            {Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
          </span>
        </div>
      </td>


      {/* Market Cap */}
      <td className="text-center">{coin.market_cap != null ? formatCurrencyCompact(coin.market_cap, currency) : '—'}</td>

      {/* Volume */}
      <td className="text-center">{coin.market_cap != null ? formatCurrencyCompact(coin.total_volume, currency) : '—'}</td>

    {/* Volume/Market Cap Progress Bar with Tooltip */}
     <td className="relative group">
        <div className="flex items-center gap-2">
            <div className="w-12 h-2 bg-gray-200 rounded overflow-hidden">
                <div
                    className="h-full bg-blue-600"
                    style={{ width: volumePercentage > 0 ? `max(${volumePercentage}%, 3px)` : "0" }}
                    aria-valuenow={ariaValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    tabIndex={0}
                    aria-describedby={tooltipId}
                />
            </div>
            <span className="text-xs text-gray-500">
              {volumePercentage.toFixed(2)}%
            </span>
            <div className="relative cursor-pointer">
                <InformationCircleIcon
                className="w-4 h-4 text-gray-400 hover:text-blue-600"
                aria-describedby={tooltipId}/>
            {/* Tooltip (visible on focus or hover) */}
                <div
                    id={tooltipId}
                    className="absolute z-10 w-40 text-sm right-2 top-[-8px] hidden group-hover:block group-focus-within:block px-3 py-2 bg-black text-white rounded shadow-lg pointer-events-none"
                    role="tooltip"
                >
                Volume/Market Cap Ratio: Indicates trading activity relative to total coin value for liquidity insights.
                </div>
            </div>
        </div>
     </td>

      {/* Sparkline chart placeholder */}
      <td>
        <div data-testid={`sparkline-${coin.id}`} className="h-6 w-24 bg-gradient-to-r from-blue-200 to-purple-300 rounded"></div>
        {/* Replace above div with a real sparkline chart component! */}
      </td>
    </tr>
  );
};
