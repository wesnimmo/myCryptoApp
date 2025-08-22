// app/api/markets/[...path]/route.js
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url); // Extract the full path from the request URL
  const pathSegments = pathname.split('/').slice(3); // Assuming /api/markets/ are the first 3 segments
  const coingeckoApiUrl = `https://api.coingecko.com/api/v3/${pathSegments.join('/')}?${request.nextUrl.searchParams.toString()}`;

  

  try {
    const response = await fetch(coingeckoApiUrl);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to fetch data from CoinGecko API' }, { status: 500 });
  }
}