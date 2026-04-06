"use client";

import { useState } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  initialPrice: number; // e.g., 65000
  symbol: string;       // e.g., "btc"
  currency: string;     // e.g., "usd"
}

export default function CurrencyConverter({ initialPrice, symbol, currency }: Props) {
  const [coinAmount, setCoinAmount] = useState<number | string>(1);
  const [fiatAmount, setFiatAmount] = useState<number | string>(initialPrice);

  const handleCoinChange = (val: string) => {
    const num = parseFloat(val) || 0;
    setCoinAmount(val);
    setFiatAmount(num * initialPrice);
  };

  const handleFiatChange = (val: string) => {
    const num = parseFloat(val) || 0;
    setFiatAmount(val);
    setCoinAmount(num / initialPrice);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex items-center gap-4">
      <div className="flex flex-col">
        <label className="text-xs uppercase text-gray-500 font-bold">{symbol}</label>
        <input 
          type="number" 
          value={coinAmount} 
          onChange={(e) => handleCoinChange(e.target.value)}
          className="bg-transparent text-xl font-bold focus:outline-none"
        />
      </div>
      
      <ArrowsRightLeftIcon className="w-6 h-6 text-blue-500" />

      <div className="flex flex-col">
        <label className="text-xs uppercase text-gray-500 font-bold">{currency}</label>
        <input 
          type="number" 
          value={fiatAmount} 
          onChange={(e) => handleFiatChange(e.target.value)}
          className="bg-transparent text-xl font-bold focus:outline-none"
        />
      </div>
    </div>
  );
}