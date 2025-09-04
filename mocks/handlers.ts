// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/markets/coins/markets', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const vsCurrency = url.searchParams.get('vs_currency') || 'usd';

    const prices = {
      usd: 9999999,
      eur: 777777777, // Realistic EUR price
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
        symbol: 'BTC',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: currentPrice,
        price_change_percentage_1h_in_currency: 0.35,
        price_change_percentage_24h: 1.23,
        market_cap: 950000000000,
        total_volume: 1000000,
        volume_market_cap: 0.001, // (total_volume / market_cap) or as needed
        rank: parseInt(page), // Or use a fixed rank or set dynamically
        sparkline_in_7d: { price: [49500, 49600, 49800, 50000] }
      }
    ]);


  }),

  // New handler for supported currencies
  http.get('/api/markets/simple/supported_vs_currencies', () => {
    return HttpResponse.json(['usd', 'eur', 'gbp']);
  }),
];