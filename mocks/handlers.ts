// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.coingecko.com/api/v3/coins/markets', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const vsCurrency = url.searchParams.get('vs_currency') || 'usd';

    const prices = {
      usd: 67000,
      eur: 62000, // Realistic EUR price
    };

    let currentPrice: number;
    if (vsCurrency === 'usd' || vsCurrency === 'eur') {
      currentPrice = prices[vsCurrency];
    } else {
      currentPrice = prices.usd; // Default or error handling
    }

    return HttpResponse.json([
      {
        id: 'bitcoin',
        name: `Bitcoin (Page ${page}, ${vsCurrency})`,
        current_price: currentPrice,
      },
    ]);
  }),
];