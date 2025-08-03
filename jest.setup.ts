// jest.setup.ts
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';


afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
