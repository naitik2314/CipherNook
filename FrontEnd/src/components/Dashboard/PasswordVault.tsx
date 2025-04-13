import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PasswordItem } from './PasswordItem';
import { KeyIcon } from 'lucide-react';
import { PasswordGenerator } from '../Tools/PasswordGenerator';

interface PasswordVaultProps {
  searchTerm: string;
  activeCategory: string | null;
}

export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  website?: string;
  category: string;
  password: string;
  strength: 'weak' | 'medium' | 'strong';
  favorite: boolean;
}

const AddPasswordModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (password: PasswordEntry) => void }> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    website: '',
    category: '',
    password: '',
    strength: 'medium',
    favorite: false,
  });

  const [useGeneratedPassword, setUseGeneratedPassword] = useState(false); // State to toggle between manual and generated password
  const [generatedPassword, setGeneratedPassword] = useState(''); // State to store the generated password

  const handleGeneratedPassword = (password: string) => {
    setGeneratedPassword(password);
    setFormData({ ...formData, password });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/passwords', formData);
      if (response.status === 200) {
        onAdd(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Password</h2>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="mb-2 p-2 border rounded w-full text-black" />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="mb-2 p-2 border rounded w-full text-black" />
        <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="mb-2 p-2 border rounded w-full text-black" />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="mb-2 p-2 border rounded w-full text-black" />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center space-x-2">
            <input
              name="password"
              placeholder="Password"
              value={useGeneratedPassword ? generatedPassword : formData.password}
              onChange={handleChange}
              disabled={useGeneratedPassword}
              className="mb-2 p-2 border rounded w-full text-black"
            />
            <button
              type="button"
              onClick={() => setUseGeneratedPassword(!useGeneratedPassword)}
              className="px-3 py-2 bg-blue-500 text-white rounded"
            >
              {useGeneratedPassword ? 'Manual' : 'Generate'}
            </button>
          </div>
          {useGeneratedPassword && (
            <div className="mt-4">
              <PasswordGenerator
                onGenerate={(password) => handleGeneratedPassword(password)}
              />
            </div>
          )}
        </div>
        <select name="strength" value={formData.strength} onChange={handleChange} className="mb-2 p-2 border rounded w-full text-black">
          <option value="weak">Weak</option>
          <option value="medium">Medium</option>
          <option value="strong">Strong</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  );
};

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

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddPassword = (newPassword: PasswordEntry) => {
    setPasswords([...passwords, newPassword]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {activeCategory === 'all' || !activeCategory ? 'All Passwords' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <div className="flex space-x-2">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Add Password</button>
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
      <AddPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddPassword} />
    </div>
  );
};

export { AddPasswordModal };