"use client";

import dynamic from "next/dynamic";
const Recharts = dynamic(() => import("./SparklineInner"), { ssr: false });

interface SparklineProps {
  prices: number[];
}

function Sparkline({ prices }: SparklineProps) {
  return <Recharts prices={prices} />;
}

export default Sparkline;