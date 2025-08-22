// app/api/markets/[...path]/route.test.ts

import { NextRequest } from 'next/server';
import { GET } from './route';

describe('Proxy API Route: /api/markets/[...path]', () => {
  let fetchSpy: jest.SpyInstance; // Declare fetchSpy outside beforeEach

  beforeEach(() => {
    // Spy on the global.fetch method and store the spy in fetchSpy
    // This allows us to mock its implementation and restore it later.
    fetchSpy = jest.spyOn(global, 'fetch'); 
  });

  afterEach(() => {
    // Restore the original fetch implementation after each test
    // This is important to prevent mocks from affecting other tests.
    fetchSpy.mockRestore(); 
  });

  it('returns CoinGecko data for a valid request (success path)', async () => {
    // Mock fetch to CoinGecko
    fetchSpy.mockResolvedValueOnce({ 
      json: async () => [{ id: 'bitcoin', name: 'Bitcoin', price: 50000 }],
      status: 200,
    } as Response);

    const url = 'http://localhost/api/markets/coins/markets?vs_currency=usd';
    const request = new NextRequest(url)
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([{ id: 'bitcoin', name: 'Bitcoin', price: 50000 }]);
    expect(fetchSpy).toHaveBeenCalled(); // Use fetchSpy for assertions
  });

  it('returns 500 if CoinGecko fetch fails (failure path)', async () => {
    // Mock fetch to throw
    fetchSpy.mockRejectedValueOnce(new Error('network error')); // Use mockRejectedValueOnce

    const url = 'http://localhost/api/markets/coins/markets?vs_currency=usd';
    const request = new NextRequest(url)
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch data from CoinGecko API' });
    expect(fetchSpy).toHaveBeenCalled();
  });
});