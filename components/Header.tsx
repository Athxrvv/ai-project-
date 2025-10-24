
import React from 'react';
import { SunIcon, MoonIcon, PlusIcon } from './icons/Icons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  onAddCustomer: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onAddCustomer }) => {
  return (
    <header className="h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Placeholder for future global search */}
      </div>
      <div className="flex items-center space-x-4">
        <button
            onClick={onAddCustomer}
            className="md:hidden flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200"
        >
            <PlusIcon />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
