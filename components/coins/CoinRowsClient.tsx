// components/coins/CoinRowsClient.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useCoinsSuspense } from '@/hooks/useCoins';
import CoinRow from './CoinRow';

export default function CoinRowsClient() {
  const { currency } = useTheme();
  const { data: coins } = useCoinsSuspense(currency, 1)

  
    if (!coins?.length) {
        return (
        <tr>
            <td colSpan={9} className="p-6 text-center text-gray-500">
            No coins found
            </td>
        </tr>
        );
    }
  
  return (
    <>
    
      {coins?.map((c) => (
        <CoinRow key={c.id} coin={c} currency={currency} />
      ))}
    </>
  );
}
