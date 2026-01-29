// jest.setup.ts
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

// 1. Rename variable to start with "mock" to bypass Jest hoisting restrictions
let mockUrl = new URL('http://localhost/?currency=usd');

jest.mock('next/navigation', () => {
  return {
    // Use a getter to ensure we always reference the current value of mockUrl
    useRouter: () => ({
      push: (href: string) => { 
        mockUrl = new URL(href, 'http://localhost'); 
      },
      replace: (href: string) => { 
        mockUrl = new URL(href, 'http://localhost'); 
      },
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }),
    usePathname: () => mockUrl.pathname,
    useSearchParams: () => mockUrl.searchParams,
    useParams: () => ({}),
  };
});


afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
