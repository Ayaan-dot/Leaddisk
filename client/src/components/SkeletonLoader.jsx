export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-3/4 skeleton-shimmer" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/2 skeleton-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-full skeleton-shimmer" />
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-2/3 skeleton-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/4 skeleton-shimmer" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/3 skeleton-shimmer" />
          </div>
          <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full skeleton-shimmer" />
          <div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/2 skeleton-shimmer" />
              <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/3 skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

