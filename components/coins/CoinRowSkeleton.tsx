// components/coins/CoinRowsSkeleton.tsx (Server)
export default function CoinRowSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-2 py-3 text-center">
            <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </td>
          <td className="px-2 py-3 text-center"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3 text-center"><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3 text-center"><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3 text-center"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3 text-center"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3 text-center"><div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
          <td className="px-2 py-3"><div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mx-auto" /></td>
        </tr>
      ))}
    </>
  );
}
