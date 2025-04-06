import React from 'react';
import { SearchIcon, PlusIcon, MenuIcon } from 'lucide-react';
interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeView: 'vault' | 'generator' | 'settings';
}
export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  activeView
}) => {
  return <header className="bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <button className="p-2 rounded-md text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            <MenuIcon size={24} />
          </button>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          {activeView === 'vault' && <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-slate-400" />
              </div>
              <input type="text" placeholder="Search passwords..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800" />
            </div>}
        </div>
        {activeView === 'vault' && <div>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <PlusIcon size={18} className="mr-1" />
              <span>New</span>
            </button>
          </div>}
      </div>
    </header>;
};