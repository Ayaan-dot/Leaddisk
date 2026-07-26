import { useState, useEffect, useRef, memo } from 'react';

function SearchBar({ onSearch, placeholder = 'Search leads...' }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const callbackRef = useRef(onSearch);

  // Keep callback ref in sync without triggering effect
  useEffect(() => {
    callbackRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      callbackRef.current(query);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]); // Only depend on query, not onSearch

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const inputRef = useRef(null);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-11 pr-11 h-12 text-base rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-gray-200/80 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-800"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary-500 transition-colors duration-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default memo(SearchBar);
