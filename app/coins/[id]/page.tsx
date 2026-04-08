// app/coins/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getCoinByIdServer } from "@/lib/coingecko-server-service";
import CurrencyConverter from "@/components/coins/CurrencyConverter";
import { formatCurrency } from "@/utils/format/currency";

type CoinPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ currency?: string }>;
};

export default async function CoinPage({ params, searchParams }: CoinPageProps) {
  const { id } = await params;
  const { currency: rawCurrency } = await searchParams;
  const currency = (rawCurrency ?? "usd").toLowerCase();
  const coin = await getCoinByIdServer(id, currency);

  const currentPrice = coin.market_data?.current_price?.[currency] ?? 0;

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-10">
      {/* 1. TOP BAR: Breadcrumbs & Identity */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16">
            <Image src={coin.image.large} alt={coin.name} fill className="object-contain" />
          </div>
          <div>
            <Link href="/" className="text-blue-500 hover:text-blue-600 text-sm font-medium">← Back to Markets</Link>
            <h1 className="text-4xl font-black flex items-center gap-3">
              {coin.name} <span className="text-gray-400 uppercase text-2xl font-light">{coin.symbol}</span>
            </h1>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Market Rank</span>
          <p className="text-xl font-black">#{coin.market_cap_rank ?? "N/A"}</p>
        </div>
      </div>

      {/* 2. DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Chart & Bio) - 8 units wide */}
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-gray-500 font-medium">Current Price</span>
              <h2 className="text-5xl font-black tracking-tight">{formatCurrency(currentPrice, currency)}</h2>
            </div>
            
            {/* CHART PLACEHOLDER */}
            <div className="aspect-video bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-400 animate-pulse font-mono uppercase tracking-widest">Interactive Chart Coming Soon</p>
            </div>
          </section>

          {/* DESCRIPTION (Using the Typography Plugin 'prose') */}
          <article className="prose prose-blue dark:prose-invert max-w-none bg-white dark:bg-transparent p-1">
            <h3 className="text-2xl font-bold">What is {coin.name}?</h3>
            <div 
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: coin.description?.en ?? "No description available." }}
            />
          </article>
        </div>

        {/* RIGHT COLUMN (Tools & Stats) - 4 units wide */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Currency Converter
            </h3>
            <CurrencyConverter 
              initialPrice={currentPrice} 
              symbol={coin.symbol} 
              currency={currency} 
            />
          </div>

          <section className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">Market Statistics</h3>
            <StatRow label="Market Cap" value={formatCurrency(coin.market_data?.market_cap?.[currency] ?? 0, currency)} />
            <StatRow label="Fully Diluted" value={formatCurrency(coin.market_data?.fully_diluted_valuation?.[currency] ?? 0, currency)} />
            <StatRow label="24h Volume" value={formatCurrency(coin.market_data?.total_volume?.[currency] ?? 0, currency)} />
            <StatRow label="Circulating Supply" value={`${coin.market_data?.circulating_supply?.toLocaleString()} ${coin.symbol.toUpperCase()}`} />
          </section>
        </div>
      </div>
    </main>
  );
}

// Small helper for the sidebar rows
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}