// app/coins/[id]/page.tsx
import Link from "next/link";
import { getCoinByIdServer } from "@/lib/coingecko-server-service";

export const revalidate = 60;

// Type definition for Next.js 15 async props
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ currency?: string }>;
};

export default async function CoinPage({ params, searchParams }: PageProps) {
  // Await the asynchronous props
  const { id } = await params;
  const { currency: rawCurrency } = await searchParams;
  
  const currency = (rawCurrency ?? "usd").toLowerCase();
  
  // PASS CURRENCY HERE so the server fetches the right price data
  const coin = await getCoinByIdServer(id, currency);

  return (
    <main className="p-4">
      <Link href="/" className="underline text-sm">← Back</Link>
      <h1 className="text-2xl font-bold mt-4">
        {coin.name} <span className="text-gray-500 text-sm uppercase">({coin.symbol})</span>
      </h1>
      <div className="mt-4 space-y-2">
        <p>Rank: {coin.market_cap_rank ?? "—"}</p>
        <p>
          Current price: {coin.market_data?.current_price?.[currency] ?? "—"} 
          <span className="ml-1 uppercase">{currency}</span>
        </p>
      </div>
    </main>
  );
}
