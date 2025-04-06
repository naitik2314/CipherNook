import React, { useState } from 'react';
import { ShieldIcon, SaveIcon, DownloadIcon, UploadIcon, MoonIcon, SunIcon, RotateCwIcon, TrashIcon, AlertTriangleIcon } from 'lucide-react';
export const SettingsPage: React.FC = () => {
  const [autoLock, setAutoLock] = useState('5');
  const [theme, setTheme] = useState('system');
  const [masterPasswordUpdated, setMasterPasswordUpdated] = useState(false);
  const handleExport = () => {
    // In a real app, this would trigger a secure export process
    alert('In a real app, this would export an encrypted backup of your passwords');
  };
  const handleImport = () => {
    // In a real app, this would trigger a secure import process
    alert('In a real app, this would allow you to import passwords from a backup file');
  };
  const handleMasterPasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the master password
    setMasterPasswordUpdated(true);
    setTimeout(() => setMasterPasswordUpdated(false), 3000);
  };
  return <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md dark:bg-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
            <ShieldIcon className="mr-2 text-blue-600" size={20} />
            Security Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="autoLock" className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
                Auto-lock after inactivity
              </label>
              <select id="autoLock" value={autoLock} onChange={e => setAutoLock(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button type="button" onClick={() => setTheme('light')} className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm ${theme === 'light' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-slate-300 dark:border-slate-600 dark:text-slate-300'}`}>
                  <SunIcon size={16} className="mr-2" />
                  Light
                </button>
                <button type="button" onClick={() => setTheme('dark')} className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm ${theme === 'dark' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-slate-300 dark:border-slate-600 dark:text-slate-300'}`}>
                  <MoonIcon size={16} className="mr-2" />
                  Dark
                </button>
                <button type="button" onClick={() => setTheme('system')} className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm ${theme === 'system' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-slate-300 dark:border-slate-600 dark:text-slate-300'}`}>
                  <RotateCwIcon size={16} className="mr-2" />
                  System
                </button>
              </div>
            </div>
            <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
                Master Password
              </h3>
              <form onSubmit={handleMasterPasswordUpdate}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Current Password
                    </label>
                    <input type="password" id="currentPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="••••••••••••" />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      New Password
                    </label>
                    <input type="password" id="newPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="••••••••••••" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Confirm New Password
                    </label>
                    <input type="password" id="confirmPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="••••••••••••" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <SaveIcon size={16} className="mr-2" />
                      Update Password
                    </button>
                  </div>
                  {masterPasswordUpdated && <div className="mt-3 p-3 bg-green-50 text-green-800 rounded-md text-sm dark:bg-green-900/30 dark:text-green-400">
                      Master password updated successfully.
                    </div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md dark:bg-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
            Data Management
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button onClick={handleExport} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <DownloadIcon size={16} className="mr-2" />
                Export Passwords
              </button>
              <button onClick={handleImport} className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600">
                <UploadIcon size={16} className="mr-2" />
                Import Passwords
              </button>
            </div>
            <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                      Danger Zone
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>
                        Deleting your vault will permanently remove all your
                        saved passwords. This action cannot be undone.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <TrashIcon size={16} className="mr-2" />
                        Delete Vault
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-4 dark:text-slate-400">
        <p>SecureVault Password Manager</p>
        <p className="mt-1">Version 1.0.0 • All data is stored locally</p>
      </div>
    </div>;
};