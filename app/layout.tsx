// app/layout.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Use Inter as a fallback
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
// import { MSWInit } from "./msw-init"; // client initializer


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Crypto App',
  description: 'A cryptocurrency dashboard using CoinGecko API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryProvider>
          <Suspense fallback={null}>
            <ThemeProvider>
              <Header />
              <div className="w-full max-w-[1140px] mx-auto bg-[var(--background)] shadow-sm min-h-screen sm:p-4 sm:rounded-lg">
              {/* <MSWInit /> */}
                {children}
              </div>
            </ThemeProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}