import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Logo from './Logo';

export default function DashboardLayout({ children }) {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo />
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebar && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileSidebar(false)}
        >
          <div
            className="w-64 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

