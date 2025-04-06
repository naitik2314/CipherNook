import React from 'react';
import { KeyIcon, Settings2Icon, KeySquareIcon, CreditCardIcon, GlobeIcon, SmartphoneIcon, WifiIcon, HomeIcon, FileKeyIcon, LogOutIcon } from 'lucide-react';
interface SidebarProps {
  activeView: 'vault' | 'generator' | 'settings';
  setActiveView: (view: 'vault' | 'generator' | 'settings') => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  onLogout: () => void;
}
export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  activeCategory,
  setActiveCategory,
  onLogout
}) => {
  const categories = [{
    id: 'all',
    name: 'All Items',
    icon: <KeyIcon size={18} />
  }, {
    id: 'websites',
    name: 'Websites',
    icon: <GlobeIcon size={18} />
  }, {
    id: 'finance',
    name: 'Financial',
    icon: <CreditCardIcon size={18} />
  }, {
    id: 'apps',
    name: 'Applications',
    icon: <SmartphoneIcon size={18} />
  }, {
    id: 'wifi',
    name: 'Wi-Fi Networks',
    icon: <WifiIcon size={18} />
  }, {
    id: 'personal',
    name: 'Personal',
    icon: <HomeIcon size={18} />
  }];
  return <div className="w-64 hidden md:flex flex-col h-full bg-white border-r border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
            <div size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            SecureVault
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <button className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeView === 'vault' && !activeCategory ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`} onClick={() => {
          setActiveView('vault');
          setActiveCategory(null);
        }}>
            <KeySquareIcon size={18} className="mr-3" />
            All Passwords
          </button>
          <div className="mt-4 mb-2 px-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
              Categories
            </h3>
          </div>
          {categories.map(category => <button key={category.id} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeCategory === category.id ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`} onClick={() => {
          setActiveView('vault');
          setActiveCategory(category.id);
        }}>
              <span className="mr-3">{category.icon}</span>
              {category.name}
            </button>)}
          <div className="mt-4 mb-2 px-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
              Tools
            </h3>
          </div>
          <button className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeView === 'generator' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`} onClick={() => setActiveView('generator')}>
            <FileKeyIcon size={18} className="mr-3" />
            Password Generator
          </button>
          <button className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeView === 'settings' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`} onClick={() => setActiveView('settings')}>
            <Settings2Icon size={18} className="mr-3" />
            Settings
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300 transition-colors duration-200" onClick={onLogout}>
          <LogOutIcon size={18} className="mr-2" />
          Lock Vault
        </button>
      </div>
    </div>;
};
// Add missing import