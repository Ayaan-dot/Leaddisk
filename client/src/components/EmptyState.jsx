export default function EmptyState({ title = 'No data found', description = '', icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon ? (
        <div className="mb-4 text-gray-300 dark:text-gray-600">{icon}</div>
      ) : (
        <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-700 p-4">
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-4">{description}</p>
      )}
      {action && action}
    </div>
  );
}

