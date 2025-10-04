import { LineChart, Line, YAxis } from "recharts";

export default function SparklineInner({ prices }: { prices: number[] }) {
    
  const min = Math.min(...prices);
  const normData = prices.map((p, i) => ({ i, p: p - min }));
  const isUp = prices[prices.length - 1] >= prices[0];
  return (
    <LineChart width={100} height={30} data={normData}>
      <YAxis hide domain={[0, Math.max(...normData.map(d => d.p))]} />
      <Line type="monotone" dataKey="p" stroke={isUp ? "#10B981" : "#EF4444"} strokeWidth={2} dot={false} />
    </LineChart>
  );
}
