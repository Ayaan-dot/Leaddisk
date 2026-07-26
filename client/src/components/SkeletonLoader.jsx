export default function SkeletonLoader({ rows = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
        </div>
      ))}
    </div>
  );
}

