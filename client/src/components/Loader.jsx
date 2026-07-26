export default function Loader({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-primary-500 dark:border-gray-700 dark:border-t-primary-400`}
      />
      {text && <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>}
    </div>
  );
}

