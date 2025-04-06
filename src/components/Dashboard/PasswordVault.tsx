import React, { useState } from 'react';
import { PasswordItem } from './PasswordItem';
interface PasswordVaultProps {
  searchTerm: string;
  activeCategory: string | null;
}
interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  website?: string;
  category: string;
  lastUpdated: string;
  strength: 'weak' | 'medium' | 'strong';
  favorite: boolean;
}
export const PasswordVault: React.FC<PasswordVaultProps> = ({
  searchTerm,
  activeCategory
}) => {
  // Sample data - in a real app this would come from secure storage
  const [passwords, setPasswords] = useState<PasswordEntry[]>([{
    id: '1',
    title: 'Google Account',
    username: 'user@example.com',
    website: 'https://google.com',
    category: 'websites',
    lastUpdated: '2023-09-15',
    strength: 'strong',
    favorite: true
  }, {
    id: '2',
    title: 'Netflix',
    username: 'user@example.com',
    website: 'https://netflix.com',
    category: 'websites',
    lastUpdated: '2023-08-22',
    strength: 'medium',
    favorite: false
  }, {
    id: '3',
    title: 'Bank of America',
    username: 'userfinance',
    website: 'https://bankofamerica.com',
    category: 'finance',
    lastUpdated: '2023-09-01',
    strength: 'strong',
    favorite: true
  }, {
    id: '4',
    title: 'Twitter',
    username: 'user@example.com',
    website: 'https://twitter.com',
    category: 'websites',
    lastUpdated: '2023-07-10',
    strength: 'weak',
    favorite: false
  }, {
    id: '5',
    title: 'Home Wi-Fi',
    username: 'admin',
    category: 'wifi',
    lastUpdated: '2023-05-20',
    strength: 'medium',
    favorite: false
  }, {
    id: '6',
    title: 'Spotify',
    username: 'user@example.com',
    website: 'https://spotify.com',
    category: 'apps',
    lastUpdated: '2023-08-05',
    strength: 'medium',
    favorite: true
  }]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  // Filter passwords based on search term and active category
  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = searchTerm === '' || password.title.toLowerCase().includes(searchTerm.toLowerCase()) || password.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || activeCategory === 'all' || password.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const toggleFavorite = (id: string) => {
    setPasswords(passwords.map(password => password.id === id ? {
      ...password,
      favorite: !password.favorite
    } : password));
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {activeCategory === 'all' || !activeCategory ? 'All Passwords' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <div className="flex space-x-2">
          {/* View toggle buttons would go here */}
        </div>
      </div>
      {filteredPasswords.length === 0 ? <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-3 bg-slate-100 rounded-full dark:bg-slate-700">
            <KeyIcon size={24} className="text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
            No passwords found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {searchTerm ? 'Try a different search term' : 'Add your first password to get started'}
          </p>
        </div> : <div className="bg-white rounded-lg shadow dark:bg-slate-800">
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredPasswords.map(password => <PasswordItem key={password.id} password={password} onToggleFavorite={() => toggleFavorite(password.id)} />)}
          </ul>
        </div>}
    </div>;
};
// Add missing import
import { KeyIcon } from 'lucide-react';