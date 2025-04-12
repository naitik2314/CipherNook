import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PasswordItem } from './PasswordItem';
import { KeyIcon } from 'lucide-react';

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
  password: string;
  strength: 'weak' | 'medium' | 'strong';
  favorite: boolean;
}

export const PasswordVault: React.FC<PasswordVaultProps> = ({
  searchTerm,
  activeCategory
}) => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/passwords');
        setPasswords(response.data);
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };

    fetchPasswords();
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {activeCategory === 'all' || !activeCategory ? 'All Passwords' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <div className="flex space-x-2">
          {/* View toggle buttons would go here */}
        </div>
      </div>
      {filteredPasswords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-3 bg-slate-100 rounded-full dark:bg-slate-700">
            <KeyIcon size={24} className="text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
            No passwords found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {searchTerm ? 'Try a different search term' : 'Add your first password to get started'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow dark:bg-slate-800">
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredPasswords.map(password => (
              <PasswordItem key={password.id} password={password} onToggleFavorite={() => toggleFavorite(password.id)} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};