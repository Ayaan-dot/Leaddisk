import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

export default function DarkModeToggle({ className = '' }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-xl transition-all duration-200 ${
        darkMode
          ? 'bg-gray-800 text-amber-400 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

